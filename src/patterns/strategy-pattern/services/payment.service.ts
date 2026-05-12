import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import {
  PaymentResult,
  PaymentStrategy,
} from '../interfaces/payment-strategy.interface';
import { PaymentStrategyResolverService } from './payment-strategy-resolver.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentStrategyResolverService: PaymentStrategyResolverService,
  ) {}

  pay(dto: CreatePaymentDto): PaymentResult {
    const strategy: PaymentStrategy =
      this.paymentStrategyResolverService.resolve(dto.provider);

    return strategy.pay(dto.orderId, dto.amount);
  }
}
