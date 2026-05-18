import { PaymentProvider } from '../enums/payment-provider.enum';

export class CreatePaymentDto {
  orderId: string;
  customerId?: string;
  amount: number;
  currency?: string;
  installments?: number;
  provider: PaymentProvider;
}
