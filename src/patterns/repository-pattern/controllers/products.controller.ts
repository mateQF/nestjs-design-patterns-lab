import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';

@Controller('patterns/repository/products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Patch(':id/stock')
  updateStock(@Param('id') id: string, @Body('stock') stock: number) {
    return this.productService.updateStock(id, stock);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.productService.delete(id);

    return {
      message: 'Product deleted successfully',
    };
  }
}
