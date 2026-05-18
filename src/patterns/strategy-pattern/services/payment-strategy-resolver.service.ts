import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PaymentProvider } from '../enums/payment-provider.enum';
import {
  PaymentRequest,
  PaymentStrategy,
} from '../interfaces/payment-strategy.interface';
import { PAYMENT_STRATEGIES } from '../tokens/payment-strategies.token';

@Injectable()
export class PaymentStrategyResolverService {
  private readonly strategies: Record<PaymentProvider, PaymentStrategy>;

  constructor(
    @Inject(PAYMENT_STRATEGIES)
    strategies: PaymentStrategy[],
  ) {
    this.strategies = strategies.reduce(
      (registry, strategy) => ({
        ...registry,
        [strategy.provider]: strategy,
      }),
      {} as Record<PaymentProvider, PaymentStrategy>,
    );
  }

  resolve(provider: PaymentProvider, request: PaymentRequest): PaymentStrategy {
    const strategy = this.strategies[provider];

    if (!strategy) {
      throw new BadRequestException(
        `Payment provider ${provider} not supported`,
      );
    }

    if (!strategy.supports(request)) {
      throw new BadRequestException(
        `Payment provider ${provider} does not support this payment request`,
      );
    }

    return strategy;
  }

  getSupportedProviders(): PaymentProvider[] {
    return Object.keys(this.strategies) as PaymentProvider[];
  }
}
