import { Injectable } from '@nestjs/common';
import {
  CurrencyConversionResult,
  ExternalCurrencyProviderAdapter,
} from '../interfaces/external-currency-provider.interface';

interface StripeCurrencyFakeResponse {
  source_currency: string;
  target_currency: string;
  source_amount: number;
  exchange_rate: number;
  target_amount: number;
}

@Injectable()
export class StripeCurrencyAdapter implements ExternalCurrencyProviderAdapter {
  convert(amount: number, from: string, to: string): CurrencyConversionResult {
    const externalResponse = this.fakeStripeRequest(amount, from, to);

    return {
      provider: 'stripe_currency',
      from: externalResponse.source_currency,
      to: externalResponse.target_currency,
      amount: externalResponse.source_amount,
      rate: externalResponse.exchange_rate,
      convertedAmount: externalResponse.target_amount,
    };
  }

  private fakeStripeRequest(
    amount: number,
    from: string,
    to: string,
  ): StripeCurrencyFakeResponse {
    const rate = 0.0009;

    return {
      source_currency: from,
      target_currency: to,
      source_amount: amount,
      exchange_rate: rate,
      target_amount: amount * rate,
    };
  }
}
