import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { randomUUID } from 'crypto';
import { CreateObserverOrderDto } from '../dto/create-observer-order.dto';
import { OrderCreatedEvent } from '../events/order-created.event';
import { ORDER_CREATED_EVENT } from '../constants/order-events';

export interface ObserverOrder {
  id: string;
  userId: string;
  userEmail: string;
  total: number;
  currency: string;
  createdAt: Date;
}

@Injectable()
export class ObserverOrderService {
  private readonly orders: ObserverOrder[] = [];

  constructor(private readonly eventEmitter: EventEmitter2) {}

  create(dto: CreateObserverOrderDto): ObserverOrder {
    const order: ObserverOrder = {
      id: randomUUID(),
      userId: dto.userId,
      userEmail: dto.userEmail,
      total: dto.total,
      currency: dto.currency ?? 'ARS',
      createdAt: new Date(),
    };

    this.orders.push(order);

    this.eventEmitter.emit(
      ORDER_CREATED_EVENT,
      new OrderCreatedEvent(
        randomUUID(),
        order.id,
        order.userId,
        order.userEmail,
        order.total,
        order.currency,
        order.createdAt,
      ),
    );

    return order;
  }

  findAll(): ObserverOrder[] {
    return this.orders;
  }
}
