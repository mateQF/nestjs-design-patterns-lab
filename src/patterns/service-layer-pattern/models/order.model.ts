import { OrderStatus } from '../enums/order-status.enum';

export interface PricingBreakdown {
  subtotal: number;
  discounts: number;
  taxes: number;
  shipping: number;
  total: number;
  appliedDiscounts: string[];
}

export interface OrderStatusHistoryEntry {
  status: OrderStatus;
  reason?: string;
  changedAt: Date;
}

export class Order {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly items: OrderItem[],
    public readonly pricing: PricingBreakdown,
    public status: OrderStatus,
    public readonly stockReservationId: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public readonly history: OrderStatusHistoryEntry[],
  ) {}

  confirm(): void {
    if (this.status !== OrderStatus.CREATED) {
      throw new Error(
        `Order ${this.id} cannot be confirmed from ${this.status}`,
      );
    }

    this.transitionTo(OrderStatus.CONFIRMED);
  }

  cancel(reason: string): void {
    if (this.status === OrderStatus.CANCELLED) {
      throw new Error(`Order ${this.id} is already cancelled`);
    }

    this.transitionTo(OrderStatus.CANCELLED, reason);
  }

  private transitionTo(status: OrderStatus, reason?: string): void {
    this.status = status;
    this.updatedAt = new Date();
    this.history.push({
      status,
      reason,
      changedAt: this.updatedAt,
    });
  }
}

export class OrderItem {
  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly quantity: number,
    public readonly unitPrice: number,
    public readonly lineTotal: number,
  ) {}
}
