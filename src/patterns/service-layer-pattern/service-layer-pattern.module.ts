import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrderService } from './services/order.service';
import { OrderPricingService } from './services/order-pricing.service';
import { OrderStockService } from './services/order-stock.service';

@Module({
  controllers: [OrdersController],
  providers: [OrderService, OrderPricingService, OrderStockService],
})
export class ServiceLayerPatternModule {}
