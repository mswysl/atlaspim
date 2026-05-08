import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AttributesController } from './modules/attributes/attributes.controller';
import { MedusaService } from './modules/medusa/medusa.service';
import { ProductsController } from './modules/products/products.controller';
import { ProductsService } from './modules/products/products.service';
import { QueueService } from './modules/queue/queue.service';
import { SyncService } from './modules/sync/sync.service';
import { WebhooksController } from './modules/webhooks/webhooks.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    WebhooksController,
    AttributesController,
  ],
  providers: [
    AppService,
    PrismaService,
    ProductsService,
    MedusaService,
    SyncService,
    QueueService,
  ],
})
export class AppModule {}
