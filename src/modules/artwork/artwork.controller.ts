import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../../common/api-key.guard';

@Controller('artwork')
@UseGuards(ApiKeyGuard)
export class ArtworkController {
  @Get('schema')
  getSchema() {
    return {
      required: ['transparent_png', 'print_region', 'dtg_dimensions'],
      optional: ['psd_reference', 'sleeve_prints', 'front_back_coordinates'],
      mockupCapabilities: ['automated_rendering'],
    };
  }
}
