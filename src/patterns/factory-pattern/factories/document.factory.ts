import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { DocumentType } from '../enums/document-type.enum';
import {
  DocumentCreator,
  DocumentModel,
} from '../interfaces/document.interface';
import { DOCUMENT_CREATORS } from '../tokens/document-creators.token';

@Injectable()
export class DocumentFactory {
  private readonly creators: Record<DocumentType, DocumentCreator>;

  constructor(
    @Inject(DOCUMENT_CREATORS)
    creators: DocumentCreator[],
  ) {
    this.creators = creators.reduce(
      (registry, creator) => ({
        ...registry,
        [creator.type]: creator,
      }),
      {} as Record<DocumentType, DocumentCreator>,
    );
  }

  create(dto: CreateDocumentDto): DocumentModel {
    this.validateCommonFields(dto);

    const creator = this.creators[dto.type];

    if (!creator) {
      throw new BadRequestException(
        `Document type ${dto.type} is not supported`,
      );
    }

    return creator.create(dto);
  }

  getSupportedTypes(): DocumentType[] {
    return Object.keys(this.creators) as DocumentType[];
  }

  private validateCommonFields(dto: CreateDocumentDto): void {
    if (!dto.title?.trim()) {
      throw new BadRequestException('Document title is required');
    }

    if (!dto.customerName?.trim()) {
      throw new BadRequestException('Document customer name is required');
    }
  }
}
