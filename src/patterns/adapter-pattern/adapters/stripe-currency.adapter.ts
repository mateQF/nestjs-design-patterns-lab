import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CurrencyProvider } from '../enums/currency-provider.enum';
import {
  CurrencyConversionRequest,
  CurrencyConversionResult,
  ExternalCurrencyProviderAdapter,
} from '../interfaces/external-currency-provider.interface';

interface StripeCurrencyFakeResponse {
  source_currency: string;
  target_currency: string;
  source_amount: number;
  exchange_rate: number;
  target_amount: number;
  request_id: string;
}

@Injectable()
export class StripeCurrencyAdapter implements ExternalCurrencyProviderAdapter {
  readonly provider = CurrencyProvider.STRIPE_CURRENCY;
  readonly supportedCurrencies = ['ARS', 'USD', 'EUR'];

  convert(request: CurrencyConversionRequest): CurrencyConversionResult {
    const externalResponse = this.fakeStripeRequest(request);

    return {
      provider: this.provider,
      from: externalResponse.source_currency,
      to: externalResponse.target_currency,
      amount: externalResponse.source_amount,
      rate: externalResponse.exchange_rate,
      convertedAmount: externalResponse.target_amount,
      externalTraceId: externalResponse.request_id,
      requestedAt: new Date(),
    };
  }

  private fakeStripeRequest(
    request: CurrencyConversionRequest,
  ): StripeCurrencyFakeResponse {
    const rates: Record<string, number> = {
      'ARS:USD': 0.0009,
      'USD:ARS': 1111,
      'USD:EUR': 0.92,
      'EUR:USD': 1.08,
      'ARS:EUR': 0.00083,
      'EUR:ARS': 1200,
    };
    const rate = rates[`${request.from}:${request.to}`] ?? 1;

    return {
      source_currency: request.from,
      target_currency: request.to,
      source_amount: request.amount,
      exchange_rate: rate,
      target_amount: request.amount * rate,
      request_id: `stripe_fx_${randomUUID()}`,
    };
  }
}
