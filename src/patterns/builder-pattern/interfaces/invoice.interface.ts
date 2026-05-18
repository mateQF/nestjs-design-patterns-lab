import { InvoiceProfile } from '../dto/create-invoice.dto';

export type InvoiceStatus = 'draft' | 'issued';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: InvoiceCustomer;
  items: InvoiceItem[];
  subtotal: number;
  taxableSubtotal: number;
  taxes: number;
  discount: number;
  total: number;
  metadata: InvoiceMetadata;
  status: InvoiceStatus;
  createdAt: Date;
  dueDate: Date;
  notes?: string;
}

export interface InvoiceCustomer {
  name: string;
  email: string;
  taxId?: string;
}

export interface InvoiceItem {
  sku?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxExempt: boolean;
  discountPercentage: number;
  subtotal: number;
  discount: number;
  taxableAmount: number;
  total: number;
}

export interface InvoiceMetadata {
  currency: string;
  taxRate: number;
  discountPercentage: number;
  profile: InvoiceProfile;
  paymentTerms: string;
}
