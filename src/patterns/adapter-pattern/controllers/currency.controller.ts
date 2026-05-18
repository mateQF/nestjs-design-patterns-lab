import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrencyConverterService } from '../services/currency-converter.service';
import {
  CompareCurrencyProvidersDto,
  ConvertCurrencyDto,
} from '../dto/convert-currency.dto';

@Controller('patterns/adapter/currency')
export class CurrencyController {
  constructor(
    private readonly currencyConverterService: CurrencyConverterService,
  ) {}

  @Post('convert')
  convert(@Body() dto: ConvertCurrencyDto) {
    return this.currencyConverterService.convert(dto);
  }

  @Post('compare')
  compare(@Body() dto: CompareCurrencyProvidersDto) {
    return this.currencyConverterService.compare(dto);
  }

  @Get('providers')
  listProviders() {
    return this.currencyConverterService.listProviders();
  }
}
