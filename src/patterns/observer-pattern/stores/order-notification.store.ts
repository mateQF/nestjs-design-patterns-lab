import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { OrderCreatedEvent } from '../events/order-created.event';

export interface OrderNotification {
  id: string;
  orderId: string;
  recipient: string;
  channel: 'email';
  status: 'queued' | 'sent';
  subject: string;
  createdAt: Date;
}

@Injectable()
export class OrderNotificationStore {
  private readonly notifications: OrderNotification[] = [];

  queueOrderCreatedEmail(event: OrderCreatedEvent): OrderNotification {
    const notification: OrderNotification = {
      id: randomUUID(),
      orderId: event.orderId,
      recipient: event.userEmail,
      channel: 'email',
      status: 'queued',
      subject: `Order ${event.orderId} received`,
      createdAt: new Date(),
    };

    this.notifications.push(notification);

    return notification;
  }

  findAll(): OrderNotification[] {
    return this.notifications;
  }
}
