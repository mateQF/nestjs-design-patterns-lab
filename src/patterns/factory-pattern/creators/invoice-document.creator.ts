import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { DocumentType } from '../enums/document-type.enum';
import {
  DocumentCreator,
  DocumentModel,
} from '../interfaces/document.interface';
import { InvoiceDocument } from '../models/invoice-document.model';

@Injectable()
export class InvoiceDocumentCreator implements DocumentCreator {
  readonly type = DocumentType.INVOICE;

  create(dto: CreateDocumentDto): DocumentModel {
    if (!dto.amount || dto.amount <= 0) {
      throw new BadRequestException('Invoice amount must be greater than zero');
    }

    return new InvoiceDocument(
      dto.title,
      dto.customerName,
      dto.amount,
      dto.taxRate ?? 0.21,
    );
  }
}
