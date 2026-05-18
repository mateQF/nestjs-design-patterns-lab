import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { SearchProductsDto } from '../dto/search-products.dto';
import { UpdateProductStockDto } from '../dto/update-product-stock.dto';

@Controller('patterns/repository/products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  findAll(@Query() query: SearchProductsDto) {
    return this.productService.findAll(query);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Patch(':id/stock')
  updateStock(@Param('id') id: string, @Body() dto: UpdateProductStockDto) {
    return this.productService.updateStock(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.productService.delete(id);

    return {
      message: 'Product deleted successfully',
    };
  }
}
