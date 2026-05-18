import { randomUUID } from 'crypto';
import { InvoiceProfile } from '../dto/create-invoice.dto';
import {
  Invoice,
  InvoiceCustomer,
  InvoiceItem,
  InvoiceMetadata,
} from '../interfaces/invoice.interface';

export class InvoiceBuilder {
  private customer: InvoiceCustomer;
  private items: InvoiceItem[] = [];
  private invoiceNumber = `INV-${new Date().getFullYear()}-${randomUUID().slice(0, 8)}`;
  private subtotal = 0;
  private taxableSubtotal = 0;
  private taxes = 0;
  private discount = 0;
  private total = 0;
  private dueDate = this.addDays(new Date(), 30);
  private notes?: string;

  private metadata: InvoiceMetadata = {
    currency: 'ARS',
    taxRate: 0.21,
    discountPercentage: 0,
    profile: 'standard',
    paymentTerms: 'Due in 30 days',
  };

  withInvoiceNumber(invoiceNumber: string): this {
    this.invoiceNumber = invoiceNumber;

    return this;
  }

  withCustomer(name: string, email: string, taxId?: string): this {
    this.customer = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      taxId,
    };

    return this;
  }

  withItems(
    items: Array<{
      sku?: string;
      description: string;
      quantity: number;
      unitPrice: number;
      discountPercentage?: number;
      taxExempt?: boolean;
    }>,
  ): this {
    this.items = items.map((item) => ({
      sku: item.sku,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      taxExempt: item.taxExempt ?? false,
      discountPercentage: item.discountPercentage ?? 0,
      subtotal: item.quantity * item.unitPrice,
      discount:
        item.quantity * item.unitPrice * ((item.discountPercentage ?? 0) / 100),
      taxableAmount: item.taxExempt
        ? 0
        : item.quantity *
          item.unitPrice *
          (1 - (item.discountPercentage ?? 0) / 100),
      total:
        item.quantity *
        item.unitPrice *
        (1 - (item.discountPercentage ?? 0) / 100),
    }));

    return this;
  }

  withCurrency(currency: string): this {
    this.metadata.currency = currency.toUpperCase();

    return this;
  }

  withTaxRate(taxRate: number): this {
    this.metadata.taxRate = taxRate;

    return this;
  }

  withDiscountPercentage(discountPercentage: number): this {
    this.metadata.discountPercentage = discountPercentage;

    return this;
  }

  withProfile(profile: InvoiceProfile): this {
    this.metadata.profile = profile;

    return this;
  }

  withPaymentTerms(paymentTerms: string): this {
    this.metadata.paymentTerms = paymentTerms;

    return this;
  }

  withDueDate(dueDate: Date): this {
    this.dueDate = dueDate;

    return this;
  }

  withDueInDays(days: number): this {
    this.dueDate = this.addDays(new Date(), days);
    this.metadata.paymentTerms = `Due in ${days} days`;

    return this;
  }

  withNotes(notes?: string): this {
    this.notes = notes;

    return this;
  }

  calculateSubtotal(): this {
    this.subtotal = this.items.reduce((total, item) => {
      return total + item.subtotal;
    }, 0);

    return this;
  }

  calculateTaxableSubtotal(): this {
    this.taxableSubtotal = this.items.reduce((total, item) => {
      return total + item.taxableAmount;
    }, 0);

    return this;
  }

  calculateTaxes(): this {
    const taxableBase = Math.max(this.taxableSubtotal - this.discount, 0);

    this.taxes = taxableBase * this.metadata.taxRate;

    return this;
  }

  calculateDiscount(): this {
    const itemDiscount = this.items.reduce((total, item) => {
      return total + item.discount;
    }, 0);
    const globalDiscount =
      (this.subtotal - itemDiscount) * (this.metadata.discountPercentage / 100);

    this.discount = itemDiscount + globalDiscount;

    return this;
  }

  calculateTotal(): this {
    this.total = this.subtotal + this.taxes - this.discount;

    return this;
  }

  calculateTotals(): this {
    return this.calculateSubtotal()
      .calculateTaxableSubtotal()
      .calculateDiscount()
      .calculateTaxes()
      .calculateTotal();
  }

  build(): Invoice {
    this.assertReadyForBuild();

    return {
      id: randomUUID(),
      invoiceNumber: this.invoiceNumber,
      customer: this.customer,
      items: this.items,
      subtotal: this.subtotal,
      taxableSubtotal: this.taxableSubtotal,
      taxes: this.taxes,
      discount: this.discount,
      total: this.total,
      metadata: this.metadata,
      status: 'issued',
      createdAt: new Date(),
      dueDate: this.dueDate,
      notes: this.notes,
    };
  }

  private assertReadyForBuild(): void {
    if (!this.customer) {
      throw new Error('Invoice customer is required');
    }

    if (!this.customer.email.includes('@')) {
      throw new Error('Invoice customer email is invalid');
    }

    if (this.items.length === 0) {
      throw new Error('Invoice must have at least one item');
    }

    for (const item of this.items) {
      if (item.quantity <= 0) {
        throw new Error(
          `Invoice item ${item.description} must have quantity greater than zero`,
        );
      }

      if (item.unitPrice <= 0) {
        throw new Error(
          `Invoice item ${item.description} must have a positive unit price`,
        );
      }
    }

    if (
      this.metadata.discountPercentage < 0 ||
      this.metadata.discountPercentage > 100
    ) {
      throw new Error('Invoice discount percentage must be between 0 and 100');
    }
  }

  private addDays(date: Date, days: number): Date {
    const dueDate = new Date(date);

    dueDate.setDate(dueDate.getDate() + days);

    return dueDate;
  }
}
