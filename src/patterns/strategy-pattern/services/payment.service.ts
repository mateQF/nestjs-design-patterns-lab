import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import {
  PaymentRequest,
  PaymentResult,
} from '../interfaces/payment-strategy.interface';
import { PaymentStrategyResolverService } from './payment-strategy-resolver.service';
import { PaymentProvider } from '../enums/payment-provider.enum';

@Injectable()
export class PaymentService {
  private readonly payments: PaymentResult[] = [];

  constructor(
    private readonly paymentStrategyResolverService: PaymentStrategyResolverService,
  ) {}

  pay(dto: CreatePaymentDto): PaymentResult {
    const request = this.toPaymentRequest(dto);
    const strategy = this.paymentStrategyResolverService.resolve(
      dto.provider,
      request,
    );
    const payment = strategy.pay(request);

    this.payments.push(payment);

    return payment;
  }

  findAll(): PaymentResult[] {
    return this.payments;
  }

  getSupportedProviders(): PaymentProvider[] {
    return this.paymentStrategyResolverService.getSupportedProviders();
  }

  private toPaymentRequest(dto: CreatePaymentDto): PaymentRequest {
    if (!dto.orderId?.trim()) {
      throw new BadRequestException('Order id is required');
    }

    if (dto.amount <= 0) {
      throw new BadRequestException('Payment amount must be greater than zero');
    }

    if (dto.installments !== undefined && dto.installments <= 0) {
      throw new BadRequestException(
        'Payment installments must be greater than zero',
      );
    }

    return {
      orderId: dto.orderId,
      customerId: dto.customerId,
      amount: dto.amount,
      currency: (dto.currency ?? 'ARS').toUpperCase(),
      installments: dto.installments ?? 1,
    };
  }
}
