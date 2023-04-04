import { NestFactory } from '@nestjs/core';
import { WordpressModule } from './wordpress.module';
import { WordpressService } from './wordpress.service';
import { AzionLogger } from '@azion/sdk/common/loggers/azion.logger';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(WordpressModule, {
    logger: new AzionLogger(),
  });
  const service = app.get(WordpressService);

  service.run();

  await app.close();
}
bootstrap();
