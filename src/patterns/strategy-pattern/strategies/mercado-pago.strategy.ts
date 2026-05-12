import { Injectable } from '@nestjs/common';
import {
  PaymentResult,
  PaymentStrategy,
} from '../interfaces/payment-strategy.interface';
import { PaymentProvider } from '../enums/payment-provider.enum';
import { randomUUID } from 'crypto';

@Injectable()
export class MercadoPagoStrategy implements PaymentStrategy {
  pay(orderId: string, amount: number): PaymentResult {
    return {
      orderId,
      provider: PaymentProvider.MERCADO_PAGO,
      amount,
      status: 'approved',
      transactionId: `mp_${randomUUID()}`,
      message: 'Payment approved using Mercado Pago',
    };
  }
}
