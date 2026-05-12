import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';

@Controller('patterns/strategy/payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  pay(@Body() dto: CreatePaymentDto) {
    return this.paymentService.pay(dto);
  }
}
