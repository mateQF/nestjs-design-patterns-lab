export class ConvertCurrencyDto {
  amount: number;
  from: string;
  to: string;
  provider: 'dolar_api' | 'stripe_currency';
}
