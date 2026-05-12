import { Injectable } from '@nestjs/common';
import {
  CurrencyConversionResult,
  ExternalCurrencyProviderAdapter,
} from '../interfaces/external-currency-provider.interface';

interface DolarApiFakeResponse {
  moneda_origen: string;
  moneda_destino: string;
  monto_original: number;
  cotizacion: number;
  resultado: number;
}

@Injectable()
export class DolarApiAdapter implements ExternalCurrencyProviderAdapter {
  convert(amount: number, from: string, to: string): CurrencyConversionResult {
    const externalResponse = this.fakeDolarApiRequest(amount, from, to);

    return {
      provider: 'dolar_api',
      from: externalResponse.moneda_origen,
      to: externalResponse.moneda_destino,
      amount: externalResponse.monto_original,
      rate: externalResponse.cotizacion,
      convertedAmount: externalResponse.resultado,
    };
  }

  private fakeDolarApiRequest(
    amount: number,
    from: string,
    to: string,
  ): DolarApiFakeResponse {
    const rate = 1100;

    return {
      moneda_origen: from,
      moneda_destino: to,
      monto_original: amount,
      cotizacion: rate,
      resultado: amount * rate,
    };
  }
}
