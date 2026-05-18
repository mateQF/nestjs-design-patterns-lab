import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../events/order-created.event';
import { ORDER_CREATED_EVENT } from '../constants/order-events';
import { OrderNotificationStore } from '../stores/order-notification.store';

@Injectable()
export class SendOrderEmailListener {
  private readonly logger = new Logger(SendOrderEmailListener.name);

  constructor(
    private readonly orderNotificationStore: OrderNotificationStore,
  ) {}

  @OnEvent(ORDER_CREATED_EVENT)
  handle(event: OrderCreatedEvent): void {
    const notification =
      this.orderNotificationStore.queueOrderCreatedEmail(event);

    this.logger.log(
      `Notification ${notification.id} queued for ${event.userEmail}`,
    );
  }
}
