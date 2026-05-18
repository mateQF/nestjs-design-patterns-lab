import { Module } from '@nestjs/common';
import { DocumentsController } from './controllers/documents.controller';
import { DocumentService } from './services/document.service';
import { DocumentFactory } from './factories/document.factory';
import { DOCUMENT_CREATORS } from './tokens/document-creators.token';
import { InvoiceDocumentCreator } from './creators/invoice-document.creator';
import { ContractDocumentCreator } from './creators/contract-document.creator';
import { ReceiptDocumentCreator } from './creators/receipt-document.creator';
import { CreditNoteDocumentCreator } from './creators/credit-note-document.creator';

@Module({
  controllers: [DocumentsController],
  providers: [
    DocumentService,
    DocumentFactory,
    InvoiceDocumentCreator,
    ContractDocumentCreator,
    ReceiptDocumentCreator,
    CreditNoteDocumentCreator,
    {
      provide: DOCUMENT_CREATORS,
      useFactory: (
        invoiceDocumentCreator: InvoiceDocumentCreator,
        contractDocumentCreator: ContractDocumentCreator,
        receiptDocumentCreator: ReceiptDocumentCreator,
        creditNoteDocumentCreator: CreditNoteDocumentCreator,
      ) => [
        invoiceDocumentCreator,
        contractDocumentCreator,
        receiptDocumentCreator,
        creditNoteDocumentCreator,
      ],
      inject: [
        InvoiceDocumentCreator,
        ContractDocumentCreator,
        ReceiptDocumentCreator,
        CreditNoteDocumentCreator,
      ],
    },
  ],
})
export class FactoryPatternModule {}
