export class CreateOrderDto {
  userId: string;
  customerTier?: 'standard' | 'gold' | 'platinum';
  couponCode?: string;
  shippingPostalCode?: string;
  items: CreateOrderItemDto[];
}

export class CreateOrderItemDto {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  availableStock: number;
}
