import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from '../dto/create-order.dto';

@Injectable()
export class OrderStockService {
  validateStock(items: CreateOrderItemDto[]): void {
    for (const item of items) {
      if (item.quantity <= 0) {
        throw new BadRequestException(
          `Quantity for product ${item.name} must be greater than zero`,
        );
      }

      if (item.quantity > item.availableStock) {
        throw new BadRequestException(
          `Product ${item.name} does not have enough stock`,
        );
      }
    }
  }
}
