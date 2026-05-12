import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order, OrderItem } from '../models/order.model';
import { OrderPricingService } from './order-pricing.service';
import { OrderStockService } from './order-stock.service';

@Injectable()
export class OrderService {
  private readonly orders: Order[] = [];

  constructor(
    private readonly orderPricingService: OrderPricingService,
    private readonly orderStockService: OrderStockService,
  ) {}

  create(dto: CreateOrderDto): Order {
    this.orderStockService.validateStock(dto.items);

    const subtotal = this.orderPricingService.calculateSubtotal(dto.items);
    const taxes = this.orderPricingService.calculateTaxes(subtotal);
    const total = this.orderPricingService.calculateTotal(subtotal, taxes);

    const orderItems = dto.items.map(
      (item) =>
        new OrderItem(item.productId, item.name, item.quantity, item.unitPrice),
    );

    const order = new Order(
      randomUUID(),
      dto.userId,
      orderItems,
      subtotal,
      taxes,
      total,
      new Date(),
    );

    this.orders.push(order);

    return order;
  }

  findAll(): Order[] {
    return this.orders;
  }
}
