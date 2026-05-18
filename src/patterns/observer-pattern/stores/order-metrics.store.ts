import { Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from '../events/order-created.event';

export interface OrderMetricsSnapshot {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  lastOrderAt?: Date;
}

@Injectable()
export class OrderMetricsStore {
  private totalOrders = 0;
  private totalRevenue = 0;
  private lastOrderAt?: Date;

  recordOrderCreated(event: OrderCreatedEvent): OrderMetricsSnapshot {
    this.totalOrders += 1;
    this.totalRevenue += event.total;
    this.lastOrderAt = event.createdAt;

    return this.snapshot();
  }

  snapshot(): OrderMetricsSnapshot {
    return {
      totalOrders: this.totalOrders,
      totalRevenue: this.totalRevenue,
      averageOrderValue:
        this.totalOrders === 0 ? 0 : this.totalRevenue / this.totalOrders,
      lastOrderAt: this.lastOrderAt,
    };
  }
}
