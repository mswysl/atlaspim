import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../../common/api-key.guard';

@Controller('attributes')
@UseGuards(ApiKeyGuard)
export class AttributesController {
  @Get('schema')
  getSchema() {
    return {
      productMaster: {
        required: ['title', 'slug', 'description'],
        optional: [
          'seo',
          'tags',
          'categories',
          'collections',
          'sizing',
          'materials',
          'artworkReferences',
          'mockups',
          'vendorInfo',
        ],
      },
      variant: {
        required: ['size', 'color', 'sku', 'price'],
      },
      roles: ['admin', 'artist', 'warehouse'],
    };
  }
}
