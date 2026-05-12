import { Injectable } from '@nestjs/common';
import {
  PaymentResult,
  PaymentStrategy,
} from '../interfaces/payment-strategy.interface';
import { PaymentProvider } from '../enums/payment-provider.enum';

@Injectable()
export class CashStrategy implements PaymentStrategy {
  pay(orderId: string, amount: number): PaymentResult {
    return {
      orderId,
      provider: PaymentProvider.CASH,
      amount,
      status: 'pending',
      message: 'Cash payment registered as pending',
    };
  }
}
