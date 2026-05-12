import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { randomUUID } from 'crypto';
import { CreateObserverOrderDto } from '../dto/create-observer-order.dto';
import { OrderCreatedEvent } from '../events/order-created.event';

export interface ObserverOrder {
  id: string;
  userId: string;
  userEmail: string;
  total: number;
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
      createdAt: new Date(),
    };

    this.orders.push(order);

    this.eventEmitter.emit(
      'order.created',
      new OrderCreatedEvent(
        order.id,
        order.userId,
        order.userEmail,
        order.total,
        order.createdAt,
      ),
    );

    return order;
  }

  findAll(): ObserverOrder[] {
    return this.orders;
  }
}
