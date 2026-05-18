import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import {
  ProductRepositoryPort,
  ProductSearchCriteria,
} from '../interfaces/product-repository.interface';

@Injectable()
export class InMemoryProductRepository implements ProductRepositoryPort {
  private readonly products: Product[] = [];

  create(product: Product): Product {
    this.products.push(product);

    return product;
  }

  findAll(criteria: ProductSearchCriteria = {}): Product[] {
    return this.products.filter((product) => {
      if (!criteria.includeInactive && product.status !== 'active') {
        return false;
      }

      if (criteria.category && product.category !== criteria.category) {
        return false;
      }

      if (criteria.lowStockOnly && !product.isLowStock) {
        return false;
      }

      if (criteria.search) {
        const value = criteria.search.toLowerCase();

        return (
          product.name.toLowerCase().includes(value) ||
          product.sku.toLowerCase().includes(value)
        );
      }

      return true;
    });
  }

  findById(id: string): Product {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  findBySku(sku: string): Product | undefined {
    return this.products.find((product) => product.sku === sku);
  }

  save(product: Product): Product {
    const productIndex = this.products.findIndex(
      (storedProduct) => storedProduct.id === product.id,
    );

    if (productIndex === -1) {
      throw new NotFoundException(`Product with id ${product.id} not found`);
    }

    this.products[productIndex] = product;

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
