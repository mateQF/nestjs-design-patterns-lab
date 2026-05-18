import { Product } from '../entities/product.entity';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface ProductSearchCriteria {
  search?: string;
  category?: string;
  lowStockOnly?: boolean;
  includeInactive?: boolean;
}

export interface ProductRepositoryPort {
  create(product: Product): Product;
  findAll(criteria?: ProductSearchCriteria): Product[];
  findById(id: string): Product;
  findBySku(sku: string): Product | undefined;
  save(product: Product): Product;
  delete(id: string): void;
}
