import { Module } from '@nestjs/common';
import { DocumentsController } from './controllers/documents.controller';
import { DocumentService } from './services/document.service';
import { DocumentFactory } from './factories/document.factory';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentService, DocumentFactory],
})
export class FactoryPatternModule {}
