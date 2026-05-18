import { Module } from '@nestjs/common';
import { InvoicesController } from './controllers/invoices.controller';
import { InvoiceService } from './services/invoice.service';
import { InvoiceDirector } from './directors/invoice.director';

@Module({
  controllers: [InvoicesController],
  providers: [InvoiceService, InvoiceDirector],
})
export class BuilderPatternModule {}
