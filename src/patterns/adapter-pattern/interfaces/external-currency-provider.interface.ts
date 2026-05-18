import { CurrencyProvider } from '../enums/currency-provider.enum';

export interface CurrencyConversionRequest {
  amount: number;
  from: string;
  to: string;
}

export interface CurrencyConversionResult {
  provider: CurrencyProvider;
  from: string;
  to: string;
  amount: number;
  rate: number;
  convertedAmount: number;
  externalTraceId: string;
  requestedAt: Date;
}

export interface ExternalCurrencyProviderAdapter {
  readonly provider: CurrencyProvider;
  readonly supportedCurrencies: string[];
  convert(request: CurrencyConversionRequest): CurrencyConversionResult;
}
