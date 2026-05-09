import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../../common/api-key.guard';
import { ProductsService } from '../products/products.service';
import { QueueService } from '../queue/queue.service';
import { SyncService } from './sync.service';

@Controller('sync/medusa')
@UseGuards(ApiKeyGuard)
export class SyncController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly syncService: SyncService,
    private readonly queueService: QueueService,
  ) {}

  @Post('product/:id')
  async syncSingle(@Param('id') id: string) {
    const product = await this.productsService.get(id);
    await this.queueService.enqueueProductSync(product);
    return { queued: true, id };
  }

  @Post('all')
  async syncAll() {
    const products = await this.productsService.list();
    await Promise.all(products.map((product) => this.queueService.enqueueProductSync(product)));
    return { queued: products.length };
  }

  @Post('product/:id/direct')
  async syncDirect(@Param('id') id: string) {
    const product = await this.productsService.get(id);
    await this.syncService.pushProductToMedusa(product);
    return { synced: true, id };
  }
}
