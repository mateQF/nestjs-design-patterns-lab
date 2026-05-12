import { randomUUID } from 'crypto';
import {
  DocumentModel,
  GeneratedDocument,
} from '../interfaces/document.interface';
import { DocumentType } from '../enums/document-type.enum';

export class ReceiptDocument implements DocumentModel {
  constructor(
    private readonly title: string,
    private readonly customerName: string,
    private readonly amount: number,
  ) {}

  generate(): GeneratedDocument {
    return {
      id: randomUUID(),
      type: DocumentType.RECEIPT,
      title: this.title,
      customerName: this.customerName,
      content: `Receipt generated for ${this.customerName}. Paid amount: ${this.amount}`,
      createdAt: new Date(),
    };
  }
}
