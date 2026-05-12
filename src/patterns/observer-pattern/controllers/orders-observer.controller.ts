import { Body, Controller, Get, Post } from '@nestjs/common';
import { ObserverOrderService } from '../services/observer-order.service';
import { CreateObserverOrderDto } from '../dto/create-observer-order.dto';

@Controller('patterns/observer/orders')
export class OrdersObserverController {
  constructor(private readonly observerOrderService: ObserverOrderService) {}

  @Post()
  create(@Body() dto: CreateObserverOrderDto) {
    return this.observerOrderService.create(dto);
  }

  @Get()
  findAll() {
    return this.observerOrderService.findAll();
  }
}
