export type InvoiceProfile = 'standard' | 'tax_exempt' | 'recurring';

export class CreateInvoiceDto {
  customerName: string;
  customerEmail: string;
  customerTaxId?: string;
  items: CreateInvoiceItemDto[];
  discountPercentage?: number;
  currency?: string;
  dueInDays?: number;
  profile?: InvoiceProfile;
  notes?: string;
}

export class CreateInvoiceItemDto {
  sku?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discountPercentage?: number;
  taxExempt?: boolean;
}
