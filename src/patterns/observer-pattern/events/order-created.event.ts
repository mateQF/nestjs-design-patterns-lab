export class OrderCreatedEvent {
  constructor(
    public readonly orderId: string,
    public readonly userId: string,
    public readonly userEmail: string,
    public readonly total: number,
    public readonly createdAt: Date,
  ) {}
}
