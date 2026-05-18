import { Module } from '@nestjs/common';
import { OrdersObserverController } from './controllers/orders-observer.controller';
import { ObserverOrderService } from './services/observer-order.service';
import { SendOrderEmailListener } from './listeners/send-order-email.listener';
import { CreateOrderAuditListener } from './listeners/create-order-audit.listener';
import { UpdateOrderMetricsListener } from './listeners/update-order-metrics.listener';
import { OrderAuditStore } from './stores/order-audit.store';
import { OrderNotificationStore } from './stores/order-notification.store';
import { OrderMetricsStore } from './stores/order-metrics.store';

@Module({
  controllers: [OrdersObserverController],
  providers: [
    ObserverOrderService,
    SendOrderEmailListener,
    CreateOrderAuditListener,
    UpdateOrderMetricsListener,
    OrderAuditStore,
    OrderNotificationStore,
    OrderMetricsStore,
  ],
})
export class ObserverPatternModule {}
