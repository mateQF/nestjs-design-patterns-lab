import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductRepository {
  private readonly products: Product[] = [];

  create(dto: CreateProductDto): Product {
    const product = new Product(randomUUID(), dto.name, dto.price, dto.stock);

    this.products.push(product);

    return product;
  }

  findAll(): Product[] {
    return this.products;
  }

  findById(id: string): Product {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  updateStock(id: string, stock: number): Product {
    const product = this.findById(id);

    product.stock = stock;

    return product;
  }

  delete(id: string): void {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    this.products.splice(productIndex, 1);
  }
}
