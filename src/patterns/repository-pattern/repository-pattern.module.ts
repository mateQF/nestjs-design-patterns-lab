import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductService } from './services/product.service';
import { InMemoryProductRepository } from './repositories/product.repository';
import { PRODUCT_REPOSITORY } from './interfaces/product-repository.interface';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: InMemoryProductRepository,
    },
  ],
})
export class RepositoryPatternModule {}
