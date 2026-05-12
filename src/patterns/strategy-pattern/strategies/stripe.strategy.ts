import { Injectable } from '@nestjs/common';
import {
  PaymentResult,
  PaymentStrategy,
} from '../interfaces/payment-strategy.interface';
import { PaymentProvider } from '../enums/payment-provider.enum';
import { randomUUID } from 'crypto';

@Injectable()
export class StripeStrategy implements PaymentStrategy {
  pay(orderId: string, amount: number): PaymentResult {
    return {
      orderId,
      provider: PaymentProvider.STRIPE,
      amount,
      status: 'approved',
      transactionId: `stripe_${randomUUID()}`,
      message: 'Payment approved using Stripe',
    };
  }
}
