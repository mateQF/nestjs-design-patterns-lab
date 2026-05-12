import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../events/order-created.event';

@Injectable()
export class UpdateOrderMetricsListener {
  private readonly logger = new Logger(UpdateOrderMetricsListener.name);

  @OnEvent('order.created')
  handle(event: OrderCreatedEvent): void {
    this.logger.log(
      `Metrics updated for order ${event.orderId}. Total amount: ${event.total}`,
    );
  }
}
