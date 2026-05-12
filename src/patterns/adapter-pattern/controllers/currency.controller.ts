import { Body, Controller, Post } from '@nestjs/common';
import { CurrencyConverterService } from '../services/currency-converter.service';
import { ConvertCurrencyDto } from '../dto/convert-currency.dto';

@Controller('patterns/adapter/currency')
export class CurrencyController {
  constructor(
    private readonly currencyConverterService: CurrencyConverterService,
  ) {}

  @Post('convert')
  convert(@Body() dto: ConvertCurrencyDto) {
    return this.currencyConverterService.convert(dto);
  }
}
