import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../events/order-created.event';
import { ORDER_CREATED_EVENT } from '../constants/order-events';
import { OrderMetricsStore } from '../stores/order-metrics.store';

@Injectable()
export class UpdateOrderMetricsListener {
  private readonly logger = new Logger(UpdateOrderMetricsListener.name);

  constructor(private readonly orderMetricsStore: OrderMetricsStore) {}

  @OnEvent(ORDER_CREATED_EVENT)
  handle(event: OrderCreatedEvent): void {
    const snapshot = this.orderMetricsStore.recordOrderCreated(event);

    this.logger.log(
      `Metrics updated after order ${event.orderId}. Total orders: ${snapshot.totalOrders}`,
    );
  }
}
