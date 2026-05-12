import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { DocumentType } from '../enums/document-type.enum';
import { DocumentModel } from '../interfaces/document.interface';
import { InvoiceDocument } from '../models/invoice-document.model';
import { ContractDocument } from '../models/contract-document.model';
import { ReceiptDocument } from '../models/receipt-document.model';

@Injectable()
export class DocumentFactory {
  create(dto: CreateDocumentDto): DocumentModel {
    switch (dto.type) {
      case DocumentType.INVOICE:
        return new InvoiceDocument(
          dto.title,
          dto.customerName,
          this.getRequiredAmount(dto.amount, dto.type),
        );

      case DocumentType.CONTRACT:
        return new ContractDocument(dto.title, dto.customerName);

      case DocumentType.RECEIPT:
        return new ReceiptDocument(
          dto.title,
          dto.customerName,
          this.getRequiredAmount(dto.amount, dto.type),
        );

      default:
        throw new BadRequestException(`Document type not supported`);
    }
  }

  private getRequiredAmount(
    amount: number | undefined,
    type: DocumentType,
  ): number {
    if (amount === undefined || amount <= 0) {
      throw new BadRequestException(
        `Amount is required for document type ${type}`,
      );
    }

    return amount;
  }
}
