import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../events/order-created.event';
import { ORDER_CREATED_EVENT } from '../constants/order-events';
import { OrderAuditStore } from '../stores/order-audit.store';

@Injectable()
export class CreateOrderAuditListener {
  private readonly logger = new Logger(CreateOrderAuditListener.name);

  constructor(private readonly orderAuditStore: OrderAuditStore) {}

  @OnEvent(ORDER_CREATED_EVENT)
  handle(event: OrderCreatedEvent): void {
    const entry = this.orderAuditStore.recordOrderCreated(event);

    this.logger.log(
      `Audit ${entry.id} created for event ${event.eventId} and order ${event.orderId}`,
    );
  }
}
