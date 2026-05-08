import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Queue, Worker } from 'bullmq';
import { SyncService } from '../sync/sync.service';

@Injectable()
export class QueueService implements OnModuleDestroy {
  private readonly logger = new Logger(QueueService.name);
  private readonly queueName = 'product-sync';
  private readonly connection = {
    host: process.env.REDIS_HOST || 'redis',
    port: Number(process.env.REDIS_PORT || 6379),
  };

  private readonly queue = new Queue(this.queueName, {
    connection: this.connection,
  });

  private readonly worker: Worker;

  constructor(private readonly syncService: SyncService) {
    this.worker = new Worker(
      this.queueName,
      async (job) => {
        if (job.name === 'sync-product') {
          await this.syncService.pushProductToMedusa(job.data.product);
        }
      },
      { connection: this.connection },
    );

    this.worker.on('completed', (job) => {
      this.logger.log(`Completed job ${job.id}`);
    });

    this.worker.on('failed', (job, err) => {
      this.logger.error(`Job ${job?.id} failed`, err.stack);
    });
  }

  async enqueueProductSync(product: any) {
    await this.queue.add('sync-product', { product });
  }

  async onModuleDestroy() {
    await this.worker.close();
    await this.queue.close();
  }
}
