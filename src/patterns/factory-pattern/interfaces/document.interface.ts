import { DocumentType } from '../enums/document-type.enum';

export interface GeneratedDocument {
  id: string;
  type: DocumentType;
  title: string;
  customerName: string;
  content: string;
  createdAt: Date;
}

export interface DocumentModel {
  generate(): GeneratedDocument;
}
