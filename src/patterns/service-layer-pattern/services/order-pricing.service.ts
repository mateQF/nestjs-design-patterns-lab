import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from '../dto/create-order.dto';

@Injectable()
export class OrderPricingService {
  private readonly taxRate = 0.21;

  calculateSubtotal(items: CreateOrderItemDto[]): number {
    return items.reduce((total, item) => {
      return total + item.quantity * item.unitPrice;
    }, 0);
  }

  calculateTaxes(subtotal: number): number {
    return subtotal * this.taxRate;
  }

  calculateTotal(subtotal: number, taxes: number): number {
    return subtotal + taxes;
  }
}
