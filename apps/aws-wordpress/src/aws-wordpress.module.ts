import { Module } from '@nestjs/common';
import { AwsWordpressService } from './aws-wordpress.service';

@Module({
  providers: [AwsWordpressService],
})
export class AwsWordpressModule {}
