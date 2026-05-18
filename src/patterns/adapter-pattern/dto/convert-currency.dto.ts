import { CurrencyProvider } from '../enums/currency-provider.enum';

export class ConvertCurrencyDto {
  amount: number;
  from: string;
  to: string;
  provider: CurrencyProvider;
}

export class CompareCurrencyProvidersDto {
  amount: number;
  from: string;
  to: string;
}
