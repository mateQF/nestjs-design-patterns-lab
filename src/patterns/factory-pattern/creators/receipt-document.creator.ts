import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { DocumentType } from '../enums/document-type.enum';
import {
  DocumentCreator,
  DocumentModel,
} from '../interfaces/document.interface';
import { ReceiptDocument } from '../models/receipt-document.model';

@Injectable()
export class ReceiptDocumentCreator implements DocumentCreator {
  readonly type = DocumentType.RECEIPT;

  create(dto: CreateDocumentDto): DocumentModel {
    if (!dto.amount || dto.amount <= 0) {
      throw new BadRequestException('Receipt amount must be greater than zero');
    }

    return new ReceiptDocument(dto.title, dto.customerName, dto.amount);
  }
}
