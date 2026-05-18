import { Injectable } from '@nestjs/common';
import {
  PaymentRequest,
  PaymentResult,
  PaymentStrategy,
} from '../interfaces/payment-strategy.interface';
import { PaymentProvider } from '../enums/payment-provider.enum';
import { randomUUID } from 'crypto';

@Injectable()
export class MercadoPagoStrategy implements PaymentStrategy {
  readonly provider = PaymentProvider.MERCADO_PAGO;

  supports(request: PaymentRequest): boolean {
    return request.currency === 'ARS' && request.installments <= 12;
  }

  pay(request: PaymentRequest): PaymentResult {
    const fee = request.amount * 0.039;

    return {
      orderId: request.orderId,
      provider: PaymentProvider.MERCADO_PAGO,
      amount: request.amount,
      currency: request.currency,
      fee,
      netAmount: request.amount - fee,
      status: 'approved',
      transactionId: `mp_${randomUUID()}`,
      authorizationCode: `MP-${randomUUID().slice(0, 8).toUpperCase()}`,
      message: 'Payment approved using Mercado Pago',
      metadata: {
        installments: request.installments,
        settlementDays: 2,
      },
    };
  }
}
