import { randomUUID } from 'crypto';
import {
  DocumentModel,
  GeneratedDocument,
} from '../interfaces/document.interface';
import { DocumentType } from '../enums/document-type.enum';

export class CreditNoteDocument implements DocumentModel {
  constructor(
    private readonly title: string,
    private readonly customerName: string,
    private readonly amount: number,
    private readonly referenceDocumentId: string,
  ) {}

  generate(): GeneratedDocument {
    return {
      id: randomUUID(),
      documentNumber: `CN-${randomUUID().slice(0, 8).toUpperCase()}`,
      type: DocumentType.CREDIT_NOTE,
      title: this.title,
      customerName: this.customerName,
      content: `Credit note generated for ${this.customerName}. Amount credited: ${this.amount}. Reference: ${this.referenceDocumentId}`,
      status: 'generated',
      createdAt: new Date(),
      metadata: {
        amount: this.amount,
        referenceDocumentId: this.referenceDocumentId,
      },
    };
  }
}
