import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CompareCurrencyProvidersDto,
  ConvertCurrencyDto,
} from '../dto/convert-currency.dto';
import {
  CurrencyConversionResult,
  ExternalCurrencyProviderAdapter,
} from '../interfaces/external-currency-provider.interface';
import { DolarApiAdapter } from '../adapters/dolar-api.adapter';
import { StripeCurrencyAdapter } from '../adapters/stripe-currency.adapter';
import { CurrencyProvider } from '../enums/currency-provider.enum';

@Injectable()
export class CurrencyConverterService {
  private readonly providers: Record<
    CurrencyProvider,
    ExternalCurrencyProviderAdapter
  >;

  constructor(
    private readonly dolarApiAdapter: DolarApiAdapter,
    private readonly stripeCurrencyAdapter: StripeCurrencyAdapter,
  ) {
    this.providers = {
      [CurrencyProvider.DOLAR_API]: this.dolarApiAdapter,
      [CurrencyProvider.STRIPE_CURRENCY]: this.stripeCurrencyAdapter,
    };
  }

  convert(dto: ConvertCurrencyDto): CurrencyConversionResult {
    const provider = this.providers[dto.provider];

    if (!provider) {
      throw new BadRequestException(
        `Currency provider ${dto.provider} not supported`,
      );
    }

    const request = {
      amount: dto.amount,
      from: dto.from.toUpperCase(),
      to: dto.to.toUpperCase(),
    };

    this.validateRequest(request.amount, request.from, request.to, provider);

    return provider.convert(request);
  }

  compare(dto: CompareCurrencyProvidersDto): CurrencyConversionResult[] {
    if (dto.amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero');
    }

    if (dto.from.toUpperCase() === dto.to.toUpperCase()) {
      throw new BadRequestException('Origin and target currencies must differ');
    }

    return Object.values(this.providers)
      .filter((provider) =>
        this.supportsCurrencyPair(
          provider,
          dto.from.toUpperCase(),
          dto.to.toUpperCase(),
        ),
      )
      .map((provider) =>
        provider.convert({
          amount: dto.amount,
          from: dto.from.toUpperCase(),
          to: dto.to.toUpperCase(),
        }),
      );
  }

  listProviders(): Array<{
    provider: CurrencyProvider;
    supportedCurrencies: string[];
  }> {
    return Object.values(this.providers).map((provider) => ({
      provider: provider.provider,
      supportedCurrencies: provider.supportedCurrencies,
    }));
  }

  private validateRequest(
    amount: number,
    from: string,
    to: string,
    provider: ExternalCurrencyProviderAdapter,
  ): void {
    if (amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero');
    }

    if (from === to) {
      throw new BadRequestException('Origin and target currencies must differ');
    }

    if (!this.supportsCurrencyPair(provider, from, to)) {
      throw new BadRequestException(
        `Provider ${provider.provider} does not support ${from}/${to}`,
      );
    }
  }

  private supportsCurrencyPair(
    provider: ExternalCurrencyProviderAdapter,
    from: string,
    to: string,
  ): boolean {
    return (
      provider.supportedCurrencies.includes(from) &&
      provider.supportedCurrencies.includes(to)
    );
  }
}
