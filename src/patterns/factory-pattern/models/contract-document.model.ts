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
  ) {}

  generate(): GeneratedDocument {
    return {
      id: randomUUID(),
      type: DocumentType.CONTRACT,
      title: this.title,
      customerName: this.customerName,
      content: `Contract generated between the company and ${this.customerName}`,
      createdAt: new Date(),
    };
  }
}
