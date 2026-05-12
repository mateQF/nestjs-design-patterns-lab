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
  ) {}

  generate(): GeneratedDocument {
    return {
      id: randomUUID(),
      type: DocumentType.INVOICE,
      title: this.title,
      customerName: this.customerName,
      content: `Invoice generated for ${this.customerName}. Total amount: ${this.amount}`,
      createdAt: new Date(),
    };
  }
}
