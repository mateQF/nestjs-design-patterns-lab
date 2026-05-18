import { PaymentProvider } from '../enums/payment-provider.enum';

export interface PaymentRequest {
  orderId: string;
  customerId?: string;
  amount: number;
  currency: string;
  installments: number;
}

export interface PaymentResult {
  orderId: string;
  provider: PaymentProvider;
  amount: number;
  currency: string;
  fee: number;
  netAmount: number;
  status: 'approved' | 'pending' | 'rejected';
  transactionId?: string;
  authorizationCode?: string;
  message: string;
  metadata: Record<string, string | number | boolean>;
}

export interface PaymentStrategy {
  readonly provider: PaymentProvider;
  supports(request: PaymentRequest): boolean;
  pay(request: PaymentRequest): PaymentResult;
}
