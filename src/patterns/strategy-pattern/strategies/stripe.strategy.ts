import { Injectable } from '@nestjs/common';
import {
  PaymentRequest,
  PaymentResult,
  PaymentStrategy,
} from '../interfaces/payment-strategy.interface';
import { PaymentProvider } from '../enums/payment-provider.enum';
import { randomUUID } from 'crypto';

@Injectable()
export class StripeStrategy implements PaymentStrategy {
  readonly provider = PaymentProvider.STRIPE;

  supports(request: PaymentRequest): boolean {
    return ['USD', 'EUR', 'ARS'].includes(request.currency);
  }

  pay(request: PaymentRequest): PaymentResult {
    const fee = request.amount * 0.029 + 0.3;

    return {
      orderId: request.orderId,
      provider: PaymentProvider.STRIPE,
      amount: request.amount,
      currency: request.currency,
      fee,
      netAmount: request.amount - fee,
      status: 'approved',
      transactionId: `stripe_${randomUUID()}`,
      authorizationCode: `ST-${randomUUID().slice(0, 8).toUpperCase()}`,
      message: 'Payment approved using Stripe',
      metadata: {
        installments: request.installments,
        fraudCheck: 'passed',
      },
    };
  }
}
