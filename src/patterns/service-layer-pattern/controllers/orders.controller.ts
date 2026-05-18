import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { CancelOrderDto } from '../dto/cancel-order.dto';

@Controller('patterns/service-layer/orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.orderService.findById(id);
  }

  @Post(':id/confirm')
  confirm(@Param('id') id: string) {
    return this.orderService.confirm(id);
  }

  @Post(':id/cancel')
  cancel(@Param('id') id: string, @Body() dto: CancelOrderDto) {
    return this.orderService.cancel(id, dto.reason);
  }
}
