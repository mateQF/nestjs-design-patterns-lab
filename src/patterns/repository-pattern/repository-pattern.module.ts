import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repositories/product.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductService, ProductRepository],
})
export class RepositoryPatternModule {}
