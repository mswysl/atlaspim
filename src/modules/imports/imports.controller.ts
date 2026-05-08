import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../../common/api-key.guard';

@Controller('imports')
@UseGuards(ApiKeyGuard)
export class ImportsController {
  @Post('csv/validate')
  validateCsv(@Body() body: { headers: string[] }) {
    const required = ['title', 'slug', 'sku', 'price'];
    const missing = required.filter((r) => !body.headers?.includes(r));
    return { valid: missing.length === 0, missing };
  }

  @Post('xlsx/validate')
  validateXlsx(@Body() body: { sheets: string[] }) {
    return { valid: (body.sheets || []).length > 0, sheets: body.sheets || [] };
  }
}
