import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../events/order-created.event';

@Injectable()
export class CreateOrderAuditListener {
  private readonly logger = new Logger(CreateOrderAuditListener.name);

  @OnEvent('order.created')
  handle(event: OrderCreatedEvent): void {
    this.logger.log(
      `Audit created: user ${event.userId} created order ${event.orderId} with total ${event.total}`,
    );
  }
}
