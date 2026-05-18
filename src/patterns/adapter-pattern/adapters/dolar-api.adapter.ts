import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CurrencyProvider } from '../enums/currency-provider.enum';
import {
  CurrencyConversionRequest,
  CurrencyConversionResult,
  ExternalCurrencyProviderAdapter,
} from '../interfaces/external-currency-provider.interface';

interface DolarApiFakeResponse {
  moneda_origen: string;
  moneda_destino: string;
  monto_original: number;
  cotizacion: number;
  resultado: number;
  id_operacion: string;
}

@Injectable()
export class DolarApiAdapter implements ExternalCurrencyProviderAdapter {
  readonly provider = CurrencyProvider.DOLAR_API;
  readonly supportedCurrencies = ['ARS', 'USD'];

  convert(request: CurrencyConversionRequest): CurrencyConversionResult {
    const externalResponse = this.fakeDolarApiRequest(request);

    return {
      provider: this.provider,
      from: externalResponse.moneda_origen,
      to: externalResponse.moneda_destino,
      amount: externalResponse.monto_original,
      rate: externalResponse.cotizacion,
      convertedAmount: externalResponse.resultado,
      externalTraceId: externalResponse.id_operacion,
      requestedAt: new Date(),
    };
  }

  private fakeDolarApiRequest(
    request: CurrencyConversionRequest,
  ): DolarApiFakeResponse {
    const rate =
      request.from === 'USD' && request.to === 'ARS' ? 1100 : 0.00091;

    return {
      moneda_origen: request.from,
      moneda_destino: request.to,
      monto_original: request.amount,
      cotizacion: rate,
      resultado: request.amount * rate,
      id_operacion: `dolar_${randomUUID()}`,
    };
  }
}
