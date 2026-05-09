import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../../common/api-key.guard';
import { PrismaService } from '../../prisma.service';

@Controller('dashboard')
@UseGuards(ApiKeyGuard)
export class DashboardController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getOverview() {
    const [products, assets, variants] = await Promise.all([
      this.prisma.product.count(),
      this.prisma.asset.count(),
      this.prisma.variant.count(),
    ]);

    return {
      products,
      assets,
      variants,
      syncStatus: 'active',
      pendingUploads: 0,
    };
  }
}
