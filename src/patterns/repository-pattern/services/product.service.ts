import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  create(dto: CreateProductDto): Product {
    return this.productRepository.create(dto);
  }

  findAll(): Product[] {
    return this.productRepository.findAll();
  }

  findById(id: string): Product {
    return this.productRepository.findById(id);
  }

  updateStock(id: string, stock: number): Product {
    return this.productRepository.updateStock(id, stock);
  }

  delete(id: string): void {
    return this.productRepository.delete(id);
  }
}
