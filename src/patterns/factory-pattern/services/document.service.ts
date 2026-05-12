import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { DocumentFactory } from '../factories/document.factory';
import { GeneratedDocument } from '../interfaces/document.interface';

@Injectable()
export class DocumentService {
  private readonly documents: GeneratedDocument[] = [];

  constructor(private readonly documentFactory: DocumentFactory) {}

  create(dto: CreateDocumentDto): GeneratedDocument {
    const documentModel = this.documentFactory.create(dto);

    const document = documentModel.generate();

    this.documents.push(document);

    return document;
  }

  findAll(): GeneratedDocument[] {
    return this.documents;
  }
}
