import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../../common/api-key.guard';

@Controller('variant-generator')
@UseGuards(ApiKeyGuard)
export class VariantGeneratorController {
  @Post('matrix')
  generate(@Body() body: { sizes: string[]; colors: string[] }) {
    const variants = (body.sizes || []).flatMap((size) =>
      (body.colors || []).map((color) => ({ size, color })),
    );

    return { count: variants.length, variants };
  }
}
