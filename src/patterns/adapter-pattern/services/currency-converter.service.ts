import { BadRequestException, Injectable } from '@nestjs/common';
import { ConvertCurrencyDto } from '../dto/convert-currency.dto';
import {
  CurrencyConversionResult,
  ExternalCurrencyProviderAdapter,
} from '../interfaces/external-currency-provider.interface';
import { DolarApiAdapter } from '../adapters/dolar-api.adapter';
import { StripeCurrencyAdapter } from '../adapters/stripe-currency.adapter';

@Injectable()
export class CurrencyConverterService {
  private readonly providers: Record<string, ExternalCurrencyProviderAdapter>;

  constructor(
    private readonly dolarApiAdapter: DolarApiAdapter,
    private readonly stripeCurrencyAdapter: StripeCurrencyAdapter,
  ) {
    this.providers = {
      dolar_api: this.dolarApiAdapter,
      stripe_currency: this.stripeCurrencyAdapter,
    };
  }

  convert(dto: ConvertCurrencyDto): CurrencyConversionResult {
    const provider = this.providers[dto.provider];

    if (!provider) {
      throw new BadRequestException(
        `Currency provider ${dto.provider} not supported`,
      );
    }

    return provider.convert(dto.amount, dto.from, dto.to);
  }
}
