import { randomUUID } from 'crypto';
import {
  DocumentModel,
  GeneratedDocument,
} from '../interfaces/document.interface';
import { DocumentType } from '../enums/document-type.enum';

export class InvoiceDocument implements DocumentModel {
  constructor(
    private readonly title: string,
    private readonly customerName: string,
    private readonly amount: number,
    private readonly taxRate: number,
  ) {}

  generate(): GeneratedDocument {
    const taxes = this.amount * this.taxRate;

    return {
      id: randomUUID(),
      documentNumber: `INV-${randomUUID().slice(0, 8).toUpperCase()}`,
      type: DocumentType.INVOICE,
      title: this.title,
      customerName: this.customerName,
      content: `Invoice generated for ${this.customerName}. Net amount: ${this.amount}. Taxes: ${taxes}. Total: ${this.amount + taxes}`,
      status: 'generated',
      createdAt: new Date(),
      metadata: {
        amount: this.amount,
        taxRate: this.taxRate,
        taxes,
      },
    };
  }
}
