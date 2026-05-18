import { DocumentType } from '../enums/document-type.enum';
import { CreateDocumentDto } from '../dto/create-document.dto';

export type DocumentStatus = 'draft' | 'generated';

export interface GeneratedDocument {
  id: string;
  documentNumber: string;
  type: DocumentType;
  title: string;
  customerName: string;
  content: string;
  status: DocumentStatus;
  createdAt: Date;
  metadata: Record<string, string | number | boolean | string[]>;
}

export interface DocumentModel {
  generate(): GeneratedDocument;
}

export interface DocumentCreator {
  readonly type: DocumentType;
  create(dto: CreateDocumentDto): DocumentModel;
}
