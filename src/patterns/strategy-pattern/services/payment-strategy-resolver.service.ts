import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentProvider } from '../enums/payment-provider.enum';
import { PaymentStrategy } from '../interfaces/payment-strategy.interface';
import { MercadoPagoStrategy } from '../strategies/mercado-pago.strategy';
import { StripeStrategy } from '../strategies/stripe.strategy';
import { CashStrategy } from '../strategies/cash.strategy';

@Injectable()
export class PaymentStrategyResolverService {
  private readonly strategies: Record<PaymentProvider, PaymentStrategy>;

  constructor(
    private readonly mercadoPagoStrategy: MercadoPagoStrategy,
    private readonly stripeStrategy: StripeStrategy,
    private readonly cashStrategy: CashStrategy,
  ) {
    this.strategies = {
      [PaymentProvider.MERCADO_PAGO]: this.mercadoPagoStrategy,
      [PaymentProvider.STRIPE]: this.stripeStrategy,
      [PaymentProvider.CASH]: this.cashStrategy,
    };
  }

  resolve(provider: PaymentProvider): PaymentStrategy {
    const strategy = this.strategies[provider];

    if (!strategy) {
      throw new BadRequestException(
        `Payment provider ${provider} not supported`,
      );
    }

    return strategy;
  }
}
