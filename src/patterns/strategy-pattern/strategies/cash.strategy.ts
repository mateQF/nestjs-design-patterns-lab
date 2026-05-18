import { Injectable } from '@nestjs/common';
import {
  PaymentRequest,
  PaymentResult,
  PaymentStrategy,
} from '../interfaces/payment-strategy.interface';
import { PaymentProvider } from '../enums/payment-provider.enum';

@Injectable()
export class CashStrategy implements PaymentStrategy {
  readonly provider = PaymentProvider.CASH;

  supports(request: PaymentRequest): boolean {
    return request.amount <= 500000 && request.installments === 1;
  }

  pay(request: PaymentRequest): PaymentResult {
    return {
      orderId: request.orderId,
      provider: PaymentProvider.CASH,
      amount: request.amount,
      currency: request.currency,
      fee: 0,
      netAmount: request.amount,
      status: 'pending',
      message: 'Cash payment registered as pending',
      metadata: {
        requiresManualConfirmation: true,
        installments: request.installments,
      },
    };
  }
}
