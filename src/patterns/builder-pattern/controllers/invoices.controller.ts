import { Body, Controller, Get, Post } from '@nestjs/common';
import { InvoiceService } from '../services/invoice.service';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';

@Controller('patterns/builder/invoices')
export class InvoicesController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@Body() dto: CreateInvoiceDto) {
    return this.invoiceService.create(dto);
  }

  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get('profiles')
  getProfiles() {
    return this.invoiceService.getProfiles();
  }
}
