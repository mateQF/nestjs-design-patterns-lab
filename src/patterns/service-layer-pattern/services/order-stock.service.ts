import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from '../dto/create-order.dto';

export interface StockReservation {
  id: string;
  orderId: string;
  items: Array<{
    productId: string;
    quantity: number;
    remainingStock: number;
  }>;
  released: boolean;
  createdAt: Date;
}

@Injectable()
export class OrderStockService {
  private readonly reservations: StockReservation[] = [];

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

  reserveStock(orderId: string, items: CreateOrderItemDto[]): StockReservation {
    this.validateStock(items);

    const reservation: StockReservation = {
      id: `res_${orderId}`,
      orderId,
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        remainingStock: item.availableStock - item.quantity,
      })),
      released: false,
      createdAt: new Date(),
    };

    this.reservations.push(reservation);

    return reservation;
  }

  releaseReservation(reservationId: string): StockReservation {
    const reservation = this.reservations.find(
      (storedReservation) => storedReservation.id === reservationId,
    );

    if (!reservation) {
      throw new BadRequestException(`Reservation ${reservationId} not found`);
    }

    reservation.released = true;

    return reservation;
  }

  findReservations(): StockReservation[] {
    return this.reservations;
  }
}
