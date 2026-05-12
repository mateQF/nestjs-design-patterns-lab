import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../events/order-created.event';

@Injectable()
export class SendOrderEmailListener {
  private readonly logger = new Logger(SendOrderEmailListener.name);

  @OnEvent('order.created')
  handle(event: OrderCreatedEvent): void {
    this.logger.log(
      `Sending email to ${event.userEmail} for order ${event.orderId}`,
    );
  }
}
