import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';

@Controller('patterns/strategy/payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  pay(@Body() dto: CreatePaymentDto) {
    return this.paymentService.pay(dto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get('providers')
  getSupportedProviders() {
    return this.paymentService.getSupportedProviders();
  }
}
