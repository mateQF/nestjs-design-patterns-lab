import { DocumentType } from '../enums/document-type.enum';

export class CreateDocumentDto {
  type: DocumentType;
  title: string;
  customerName: string;
  amount?: number;
}
