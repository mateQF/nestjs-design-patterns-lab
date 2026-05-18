import { Injectable } from '@nestjs/common';
import { CreateOrderDto, CreateOrderItemDto } from '../dto/create-order.dto';
import { PricingBreakdown } from '../models/order.model';

@Injectable()
export class OrderPricingService {
  private readonly taxRate = 0.21;
  private readonly freeShippingThreshold = 100000;
  private readonly standardShippingCost = 4500;

  calculateSubtotal(items: CreateOrderItemDto[]): number {
    return items.reduce((total, item) => {
      return total + item.quantity * item.unitPrice;
    }, 0);
  }

  calculate(dto: CreateOrderDto): PricingBreakdown {
    const subtotal = this.calculateSubtotal(dto.items);
    const appliedDiscounts: string[] = [];
    let discounts = 0;

    const tierDiscountPercentage = this.getTierDiscountPercentage(
      dto.customerTier ?? 'standard',
    );

    if (tierDiscountPercentage > 0) {
      discounts += subtotal * tierDiscountPercentage;
      appliedDiscounts.push(`${dto.customerTier} customer discount`);
    }

    if (dto.couponCode === 'WELCOME10') {
      discounts += subtotal * 0.1;
      appliedDiscounts.push('WELCOME10 coupon');
    }

    const taxableBase = Math.max(subtotal - discounts, 0);
    const taxes = taxableBase * this.taxRate;
    const shipping =
      taxableBase >= this.freeShippingThreshold ? 0 : this.standardShippingCost;

    return {
      subtotal,
      discounts,
      taxes,
      shipping,
      total: taxableBase + taxes + shipping,
      appliedDiscounts,
    };
  }

  private getTierDiscountPercentage(
    tier: NonNullable<CreateOrderDto['customerTier']>,
  ): number {
    const discounts = {
      standard: 0,
      gold: 0.05,
      platinum: 0.1,
    };

    return discounts[tier];
  }
}
