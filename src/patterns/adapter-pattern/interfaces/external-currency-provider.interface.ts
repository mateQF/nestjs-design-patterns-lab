export interface CurrencyConversionResult {
  provider: string;
  from: string;
  to: string;
  amount: number;
  rate: number;
  convertedAmount: number;
}

export interface ExternalCurrencyProviderAdapter {
  convert(amount: number, from: string, to: string): CurrencyConversionResult;
}
