import { Body, Controller, Get, Post } from '@nestjs/common';
import { DocumentService } from '../services/document.service';
import { CreateDocumentDto } from '../dto/create-document.dto';

@Controller('patterns/factory/documents')
export class DocumentsController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  create(@Body() dto: CreateDocumentDto) {
    return this.documentService.create(dto);
  }

  @Get()
  findAll() {
    return this.documentService.findAll();
  }

  @Get('types')
  getSupportedTypes() {
    return this.documentService.getSupportedTypes();
  }
}
