import { randomUUID } from 'crypto';
import {
  DocumentModel,
  GeneratedDocument,
} from '../interfaces/document.interface';
import { DocumentType } from '../enums/document-type.enum';

export class ContractDocument implements DocumentModel {
  constructor(
    private readonly title: string,
    private readonly customerName: string,
    private readonly clauses: string[],
  ) {}

  generate(): GeneratedDocument {
    return {
      id: randomUUID(),
      documentNumber: `CTR-${randomUUID().slice(0, 8).toUpperCase()}`,
      type: DocumentType.CONTRACT,
      title: this.title,
      customerName: this.customerName,
      content: `Contract generated between the company and ${this.customerName}. Clauses: ${this.clauses.join('; ')}`,
      status: 'generated',
      createdAt: new Date(),
      metadata: {
        clauses: this.clauses,
        requiresSignature: true,
      },
    };
  }
}
