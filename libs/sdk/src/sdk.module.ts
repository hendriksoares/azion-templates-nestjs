import { Module } from '@nestjs/common';
import { EdgeService } from './edge/edge.service';
import { HttpModule } from '@nestjs/axios';
import { DomainService } from './domain/domain.service';
import { CacheService } from './cache/cache.service';

@Module({
  imports: [HttpModule],
  providers: [EdgeService, DomainService, CacheService],
  exports: [EdgeService],
})
export class AzionSdkModule {}
