import { Injectable, Logger } from '@nestjs/common';
import { MedusaService } from '../medusa/medusa.service';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(private readonly medusaService: MedusaService) {}

  async pushProductToMedusa(product: any) {
    const medusaProduct = {
      title: product.title,
      handle: product.slug,
      description: product.description,
      status: product.status,
      variants: product.variants.map((variant: any) => ({
        title: `${variant.size}/${variant.color}`,
        sku: variant.sku,
        prices: [{ amount: variant.price, currency_code: 'usd' }],
      })),
      metadata: {
        pim_id: product.id,
      },
    };

    this.logger.log(`Syncing ${product.slug} to Medusa`);
    return this.medusaService.createProduct(medusaProduct);
  }
}
