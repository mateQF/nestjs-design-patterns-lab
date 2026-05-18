import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { OrderCreatedEvent } from '../events/order-created.event';

export interface OrderAuditEntry {
  id: string;
  orderId: string;
  userId: string;
  action: string;
  message: string;
  createdAt: Date;
}

@Injectable()
export class OrderAuditStore {
  private readonly entries: OrderAuditEntry[] = [];

  recordOrderCreated(event: OrderCreatedEvent): OrderAuditEntry {
    const entry: OrderAuditEntry = {
      id: randomUUID(),
      orderId: event.orderId,
      userId: event.userId,
      action: 'order.created',
      message: `User ${event.userId} created order ${event.orderId}`,
      createdAt: new Date(),
    };

    this.entries.push(entry);

    return entry;
  }

  findAll(): OrderAuditEntry[] {
    return this.entries;
  }
}
