import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { DocumentType } from '../enums/document-type.enum';
import {
  DocumentCreator,
  DocumentModel,
} from '../interfaces/document.interface';
import { ContractDocument } from '../models/contract-document.model';

@Injectable()
export class ContractDocumentCreator implements DocumentCreator {
  readonly type = DocumentType.CONTRACT;

  create(dto: CreateDocumentDto): DocumentModel {
    return new ContractDocument(
      dto.title,
      dto.customerName,
      dto.clauses ?? ['General terms accepted by both parties'],
    );
  }
}
