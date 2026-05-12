export class CreateOrderDto {
  userId: string;
  items: CreateOrderItemDto[];
}

export class CreateOrderItemDto {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  availableStock: number;
}
