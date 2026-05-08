import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QueueService } from '../queue/queue.service';
import { UpsertProductDto } from './dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly queueService: QueueService,
  ) {}

  @Get()
  list() {
    return this.productsService.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.productsService.get(id);
  }

  @Post()
  async upsert(@Body() dto: UpsertProductDto) {
    const product = await this.productsService.upsert(dto);
    await this.queueService.enqueueProductSync(product);
    return product;
  }
}
