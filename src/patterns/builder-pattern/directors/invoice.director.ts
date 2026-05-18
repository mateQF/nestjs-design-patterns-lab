import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { InvoiceBuilder } from '../builders/invoice.builder';
import { Invoice } from '../interfaces/invoice.interface';

@Injectable()
export class InvoiceDirector {
  build(dto: CreateInvoiceDto): Invoice {
    switch (dto.profile ?? 'standard') {
      case 'tax_exempt':
        return this.buildTaxExemptInvoice(dto);

      case 'recurring':
        return this.buildRecurringInvoice(dto);

      case 'standard':
      default:
        return this.buildStandardInvoice(dto);
    }
  }

  getAvailableProfiles(): string[] {
    return ['standard', 'tax_exempt', 'recurring'];
  }

  private buildStandardInvoice(dto: CreateInvoiceDto): Invoice {
    return this.baseBuilder(dto)
      .withProfile('standard')
      .withTaxRate(0.21)
      .withDueInDays(dto.dueInDays ?? 30)
      .calculateTotals()
      .build();
  }

  private buildTaxExemptInvoice(dto: CreateInvoiceDto): Invoice {
    const taxExemptDto: CreateInvoiceDto = {
      ...dto,
      items: dto.items.map((item) => ({
        ...item,
        taxExempt: true,
      })),
    };

    return this.baseBuilder(taxExemptDto)
      .withProfile('tax_exempt')
      .withTaxRate(0)
      .withPaymentTerms('Tax exempt invoice. Due in 15 days')
      .withDueInDays(dto.dueInDays ?? 15)
      .calculateTotals()
      .build();
  }

  private buildRecurringInvoice(dto: CreateInvoiceDto): Invoice {
    return this.baseBuilder(dto)
      .withProfile('recurring')
      .withTaxRate(0.21)
      .withPaymentTerms('Recurring invoice. Auto-charge scheduled')
      .withDueInDays(dto.dueInDays ?? 7)
      .withNotes(dto.notes ?? 'Generated from recurring billing profile')
      .calculateTotals()
      .build();
  }

  private baseBuilder(dto: CreateInvoiceDto): InvoiceBuilder {
    return new InvoiceBuilder()
      .withCustomer(dto.customerName, dto.customerEmail, dto.customerTaxId)
      .withItems(dto.items)
      .withCurrency(dto.currency ?? 'ARS')
      .withDiscountPercentage(dto.discountPercentage ?? 0)
      .withNotes(dto.notes);
  }
}
