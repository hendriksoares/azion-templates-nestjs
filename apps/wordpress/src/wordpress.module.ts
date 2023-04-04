import { Module } from '@nestjs/common';
import { WordpressService } from './wordpress.service';
import { AzionSdkModule } from 'libs/sdk/src';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AzionSdkModule, ConfigModule.forRoot()],
  providers: [WordpressService],
})
export class WordpressModule {}
