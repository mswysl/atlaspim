import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../../common/api-key.guard';

@Controller('channels')
@UseGuards(ApiKeyGuard)
export class ChannelsController {
  @Get()
  list() {
    return [
      { key: 'medusa', enabled: true },
      { key: 'shopify', enabled: false },
      { key: 'bigcartel', enabled: false },
      { key: 'etsy', enabled: false },
      { key: 'swiftpod', enabled: false },
    ];
  }
}
