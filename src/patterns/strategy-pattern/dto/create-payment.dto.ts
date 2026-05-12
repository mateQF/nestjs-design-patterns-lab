import { PaymentProvider } from '../enums/payment-provider.enum';

export class CreatePaymentDto {
  orderId: string;
  amount: number;
  provider: PaymentProvider;
}
