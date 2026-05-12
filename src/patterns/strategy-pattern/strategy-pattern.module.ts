import { Module } from '@nestjs/common';
import { PaymentsController } from './controllers/payments.controller';
import { PaymentService } from './services/payment.service';
import { PaymentStrategyResolverService } from './services/payment-strategy-resolver.service';
import { MercadoPagoStrategy } from './strategies/mercado-pago.strategy';
import { StripeStrategy } from './strategies/stripe.strategy';
import { CashStrategy } from './strategies/cash.strategy';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentService,
    PaymentStrategyResolverService,
    MercadoPagoStrategy,
    StripeStrategy,
    CashStrategy,
  ],
})
export class StrategyPatternModule {}
