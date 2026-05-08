import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UpsertProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.product.findMany({
      include: { variants: true, assets: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async get(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { variants: true, assets: true },
    });

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return product;
  }

  async upsert(dto: UpsertProductDto) {
    return this.prisma.product.upsert({
      where: { slug: dto.slug },
      create: {
        title: dto.title,
        slug: dto.slug,
        description: dto.description,
        status: dto.status,
        variants: { create: dto.variants },
        assets: { create: dto.assets ?? [] },
      },
      update: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        variants: {
          deleteMany: {},
          create: dto.variants,
        },
        assets: {
          deleteMany: {},
          create: dto.assets ?? [],
        },
      },
      include: { variants: true, assets: true },
    });
  }
}
