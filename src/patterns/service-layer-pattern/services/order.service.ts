import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order, OrderItem } from '../models/order.model';
import { OrderPricingService } from './order-pricing.service';
import { OrderStockService } from './order-stock.service';
import { OrderStatus } from '../enums/order-status.enum';

@Injectable()
export class OrderService {
  private readonly orders: Order[] = [];

  constructor(
    private readonly orderPricingService: OrderPricingService,
    private readonly orderStockService: OrderStockService,
  ) {}

  create(dto: CreateOrderDto): Order {
    this.validateCreateOrder(dto);

    const orderId = randomUUID();
    const reservation = this.orderStockService.reserveStock(orderId, dto.items);
    const pricing = this.orderPricingService.calculate(dto);

    const orderItems = dto.items.map(
      (item) =>
        new OrderItem(
          item.productId,
          item.name,
          item.quantity,
          item.unitPrice,
          item.quantity * item.unitPrice,
        ),
    );

    const createdAt = new Date();
    const order = new Order(
      orderId,
      dto.userId,
      orderItems,
      pricing,
      OrderStatus.CREATED,
      reservation.id,
      createdAt,
      createdAt,
      [
        {
          status: OrderStatus.CREATED,
          changedAt: createdAt,
        },
      ],
    );

    this.orders.push(order);

    return order;
  }

  findAll(): Order[] {
    return this.orders;
  }

  findById(id: string): Order {
    const order = this.orders.find((storedOrder) => storedOrder.id === id);

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }

  confirm(id: string): Order {
    const order = this.findById(id);

    try {
      order.confirm();
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }

    return order;
  }

  cancel(id: string, reason: string): Order {
    const order = this.findById(id);

    if (!reason?.trim()) {
      throw new BadRequestException('Cancellation reason is required');
    }

    try {
      order.cancel(reason);
      this.orderStockService.releaseReservation(order.stockReservationId);
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }

    return order;
  }

  private validateCreateOrder(dto: CreateOrderDto): void {
    if (!dto.userId?.trim()) {
      throw new BadRequestException('User id is required');
    }

    if (!dto.items?.length) {
      throw new BadRequestException('Order must contain at least one item');
    }
  }
}
