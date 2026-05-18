import { Body, Controller, Get, Post } from '@nestjs/common';
import { ObserverOrderService } from '../services/observer-order.service';
import { CreateObserverOrderDto } from '../dto/create-observer-order.dto';
import { OrderAuditStore } from '../stores/order-audit.store';
import { OrderNotificationStore } from '../stores/order-notification.store';
import { OrderMetricsStore } from '../stores/order-metrics.store';

@Controller('patterns/observer/orders')
export class OrdersObserverController {
  constructor(
    private readonly observerOrderService: ObserverOrderService,
    private readonly orderAuditStore: OrderAuditStore,
    private readonly orderNotificationStore: OrderNotificationStore,
    private readonly orderMetricsStore: OrderMetricsStore,
  ) {}

  @Post()
  create(@Body() dto: CreateObserverOrderDto) {
    return this.observerOrderService.create(dto);
  }

  @Get()
  findAll() {
    return this.observerOrderService.findAll();
  }

  @Get('audit')
  findAuditEntries() {
    return this.orderAuditStore.findAll();
  }

  @Get('notifications')
  findNotifications() {
    return this.orderNotificationStore.findAll();
  }

  @Get('metrics')
  getMetrics() {
    return this.orderMetricsStore.snapshot();
  }
}
