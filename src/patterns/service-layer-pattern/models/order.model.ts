export class Order {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly items: OrderItem[],
    public readonly subtotal: number,
    public readonly taxes: number,
    public readonly total: number,
    public readonly createdAt: Date,
  ) {}
}

export class OrderItem {
  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly quantity: number,
    public readonly unitPrice: number,
  ) {}
}
