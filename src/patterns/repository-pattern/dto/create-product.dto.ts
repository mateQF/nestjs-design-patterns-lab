export class CreateProductDto {
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minimumStock?: number;
}
