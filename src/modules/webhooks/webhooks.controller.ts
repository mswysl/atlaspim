import { Body, Controller, Headers, Logger, Post } from '@nestjs/common';

@Controller('webhooks/medusa')
export class WebhooksController {
  private readonly logger = new Logger(WebhooksController.name);

  @Post()
  receive(@Headers('x-medusa-signature') signature: string, @Body() body: any) {
    this.logger.log(`Received Medusa webhook: ${body?.event || 'unknown'}`);
    return {
      ok: true,
      signaturePresent: Boolean(signature),
    };
  }
}
