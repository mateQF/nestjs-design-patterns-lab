export class OrderCreatedEvent {
  constructor(
    public readonly eventId: string,
    public readonly orderId: string,
    public readonly userId: string,
    public readonly userEmail: string,
    public readonly total: number,
    public readonly currency: string,
    public readonly createdAt: Date,
  ) {}
}
