import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { DocumentType } from '../enums/document-type.enum';
import {
  DocumentCreator,
  DocumentModel,
} from '../interfaces/document.interface';
import { CreditNoteDocument } from '../models/credit-note-document.model';

@Injectable()
export class CreditNoteDocumentCreator implements DocumentCreator {
  readonly type = DocumentType.CREDIT_NOTE;

  create(dto: CreateDocumentDto): DocumentModel {
    if (!dto.amount || dto.amount <= 0) {
      throw new BadRequestException(
        'Credit note amount must be greater than zero',
      );
    }

    if (!dto.referenceDocumentId) {
      throw new BadRequestException(
        'Credit note requires a reference document id',
      );
    }

    return new CreditNoteDocument(
      dto.title,
      dto.customerName,
      dto.amount,
      dto.referenceDocumentId,
    );
  }
}
