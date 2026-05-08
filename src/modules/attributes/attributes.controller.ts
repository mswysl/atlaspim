import { Controller, Get } from '@nestjs/common';

@Controller('attributes')
export class AttributesController {
  @Get('schema')
  getSchema() {
    return {
      product: {
        required: ['title', 'slug', 'variants'],
        fields: ['title', 'slug', 'description', 'status'],
      },
      variant: {
        required: ['size', 'color', 'sku', 'price'],
      },
    };
  }
}
