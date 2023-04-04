import { Module } from '@nestjs/common';
import { EdgeService } from './edge/edge.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [EdgeService],
  exports: [EdgeService],
})
export class AzionSdkModule {}
