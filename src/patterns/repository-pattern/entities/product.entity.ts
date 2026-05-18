export type ProductStatus = 'active' | 'inactive';

export class Product {
  constructor(
    public readonly id: string,
    public readonly sku: string,
    public name: string,
    public category: string,
    public price: number,
    public stock: number,
    public minimumStock: number,
    public status: ProductStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  get isLowStock(): boolean {
    return this.stock <= this.minimumStock;
  }

  changeStock(stock: number): void {
    if (stock < 0) {
      throw new Error('Product stock cannot be negative');
    }

    this.stock = stock;
    this.touch();
  }

  changePrice(price: number): void {
    if (price <= 0) {
      throw new Error('Product price must be greater than zero');
    }

    this.price = price;
    this.touch();
  }

  deactivate(): void {
    this.status = 'inactive';
    this.touch();
  }

  private touch(): void {
    this.updatedAt = new Date();
  }
}
