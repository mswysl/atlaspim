import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ApiKeyGuard } from './common/api-key.guard';
import { ArtworkController } from './modules/artwork/artwork.controller';
import { AttributesController } from './modules/attributes/attributes.controller';
import { ChannelsController } from './modules/channels/channels.controller';
import { DashboardController } from './modules/dashboard/dashboard.controller';
import { ImportsController } from './modules/imports/imports.controller';
import { MedusaService } from './modules/medusa/medusa.service';
import { ProductsController } from './modules/products/products.controller';
import { ProductsService } from './modules/products/products.service';
import { QueueService } from './modules/queue/queue.service';
import { SyncController } from './modules/sync/sync.controller';
import { SyncService } from './modules/sync/sync.service';
import { VariantGeneratorController } from './modules/variant-generator/variant-generator.controller';
import { WebhooksController } from './modules/webhooks/webhooks.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    WebhooksController,
    AttributesController,
    SyncController,
    DashboardController,
    ImportsController,
    ChannelsController,
    VariantGeneratorController,
    ArtworkController,
  ],
  providers: [
    AppService,
    PrismaService,
    ProductsService,
    MedusaService,
    SyncService,
    QueueService,
    ApiKeyGuard,
  ],
})
export class AppModule {}
