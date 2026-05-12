import { Module } from '@nestjs/common';
import { OrdersObserverController } from './controllers/orders-observer.controller';
import { ObserverOrderService } from './services/observer-order.service';
import { SendOrderEmailListener } from './listeners/send-order-email.listener';
import { CreateOrderAuditListener } from './listeners/create-order-audit.listener';
import { UpdateOrderMetricsListener } from './listeners/update-order-metrics.listener';

@Module({
  controllers: [OrdersObserverController],
  providers: [
    ObserverOrderService,
    SendOrderEmailListener,
    CreateOrderAuditListener,
    UpdateOrderMetricsListener,
  ],
})
export class ObserverPatternModule {}
