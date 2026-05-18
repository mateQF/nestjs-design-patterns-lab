import { Module } from '@nestjs/common';
import { PaymentsController } from './controllers/payments.controller';
import { PaymentService } from './services/payment.service';
import { PaymentStrategyResolverService } from './services/payment-strategy-resolver.service';
import { MercadoPagoStrategy } from './strategies/mercado-pago.strategy';
import { StripeStrategy } from './strategies/stripe.strategy';
import { CashStrategy } from './strategies/cash.strategy';
import { PAYMENT_STRATEGIES } from './tokens/payment-strategies.token';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentService,
    PaymentStrategyResolverService,
    MercadoPagoStrategy,
    StripeStrategy,
    CashStrategy,
    {
      provide: PAYMENT_STRATEGIES,
      useFactory: (
        mercadoPagoStrategy: MercadoPagoStrategy,
        stripeStrategy: StripeStrategy,
        cashStrategy: CashStrategy,
      ) => [mercadoPagoStrategy, stripeStrategy, cashStrategy],
      inject: [MercadoPagoStrategy, StripeStrategy, CashStrategy],
    },
  ],
})
export class StrategyPatternModule {}
