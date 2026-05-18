import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';
import { SearchProductsDto } from '../dto/search-products.dto';
import { UpdateProductStockDto } from '../dto/update-product-stock.dto';
import {
  PRODUCT_REPOSITORY,
  ProductRepositoryPort,
  ProductSearchCriteria,
} from '../interfaces/product-repository.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  create(dto: CreateProductDto): Product {
    this.validateCreateProduct(dto);

    const existingProduct = this.productRepository.findBySku(dto.sku);

    if (existingProduct) {
      throw new BadRequestException(`Product sku ${dto.sku} already exists`);
    }

    const product = new Product(
      randomUUID(),
      dto.sku.trim().toUpperCase(),
      dto.name.trim(),
      dto.category.trim().toLowerCase(),
      dto.price,
      dto.stock,
      dto.minimumStock ?? 0,
      'active',
      new Date(),
      new Date(),
    );

    return this.productRepository.create(product);
  }

  findAll(query: SearchProductsDto = {}): Product[] {
    return this.productRepository.findAll(this.toSearchCriteria(query));
  }

  findById(id: string): Product {
    return this.productRepository.findById(id);
  }

  updateStock(id: string, dto: UpdateProductStockDto): Product {
    const product = this.productRepository.findById(id);
    const stock = Number(dto.stock);

    if (!Number.isFinite(stock)) {
      throw new BadRequestException('Product stock must be a valid number');
    }

    product.changeStock(stock);

    return this.productRepository.save(product);
  }

  delete(id: string): void {
    return this.productRepository.delete(id);
  }

  private validateCreateProduct(dto: CreateProductDto): void {
    if (!dto.sku?.trim()) {
      throw new BadRequestException('Product sku is required');
    }

    if (!dto.name?.trim()) {
      throw new BadRequestException('Product name is required');
    }

    if (!dto.category?.trim()) {
      throw new BadRequestException('Product category is required');
    }

    if (dto.price <= 0) {
      throw new BadRequestException('Product price must be greater than zero');
    }

    if (dto.stock < 0) {
      throw new BadRequestException('Product stock cannot be negative');
    }
  }

  private toSearchCriteria(query: SearchProductsDto): ProductSearchCriteria {
    return {
      search: query.search,
      category: query.category?.toLowerCase(),
      lowStockOnly: query.lowStockOnly === 'true',
      includeInactive: query.includeInactive === 'true',
    };
  }
}
