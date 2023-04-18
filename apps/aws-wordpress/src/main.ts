import { NestFactory } from '@nestjs/core';
import { AzionLogger } from '@azion/sdk/common/loggers/azion.logger';
import { AwsWordpressModule } from './aws-wordpress.module';
import { AwsWordpressService } from './aws-wordpress.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AwsWordpressModule, {
    logger: new AzionLogger(),
  });
  const service = app.get(AwsWordpressService);

  service.run();

  await app.close();
}
bootstrap();
