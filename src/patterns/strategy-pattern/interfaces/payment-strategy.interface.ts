import { PaymentProvider } from '../enums/payment-provider.enum';

export interface PaymentResult {
  orderId: string;
  provider: PaymentProvider;
  amount: number;
  status: 'approved' | 'pending' | 'rejected';
  transactionId?: string;
  message: string;
}

export interface PaymentStrategy {
  pay(orderId: string, amount: number): PaymentResult;
}
