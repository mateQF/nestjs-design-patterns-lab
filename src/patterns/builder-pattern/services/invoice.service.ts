import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { Invoice } from '../interfaces/invoice.interface';
import { InvoiceDirector } from '../directors/invoice.director';

@Injectable()
export class InvoiceService {
  private readonly invoices: Invoice[] = [];

  constructor(private readonly invoiceDirector: InvoiceDirector) {}

  create(dto: CreateInvoiceDto): Invoice {
    this.validateDto(dto);

    const invoice = this.invoiceDirector.build(dto);

    this.invoices.push(invoice);

    return invoice;
  }

  findAll(): Invoice[] {
    return this.invoices;
  }

  getProfiles(): string[] {
    return this.invoiceDirector.getAvailableProfiles();
  }

  private validateDto(dto: CreateInvoiceDto): void {
    if (!dto.customerName?.trim()) {
      throw new BadRequestException('Customer name is required');
    }

    if (!dto.customerEmail?.includes('@')) {
      throw new BadRequestException('Customer email is invalid');
    }

    if (!dto.items?.length) {
      throw new BadRequestException('Invoice must have at least one item');
    }

    if (dto.discountPercentage !== undefined) {
      if (dto.discountPercentage < 0 || dto.discountPercentage > 100) {
        throw new BadRequestException(
          'Discount percentage must be between 0 and 100',
        );
      }
    }
  }
}
