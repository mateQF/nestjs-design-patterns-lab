import { Module } from '@nestjs/common';
import { CurrencyController } from './controllers/currency.controller';
import { CurrencyConverterService } from './services/currency-converter.service';
import { DolarApiAdapter } from './adapters/dolar-api.adapter';
import { StripeCurrencyAdapter } from './adapters/stripe-currency.adapter';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyConverterService, DolarApiAdapter, StripeCurrencyAdapter],
})
export class AdapterPatternModule {}
