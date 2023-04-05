import { Module } from '@nestjs/common';
import { EdgeService } from './edge/edge.service';
import { HttpModule } from '@nestjs/axios';
import { DomainService } from './domain/domain.service';
import { CacheService } from './cache/cache.service';
import { RulesService } from './rules/rules.service';

@Module({
  imports: [HttpModule],
  providers: [EdgeService, DomainService, CacheService, RulesService],
  exports: [EdgeService],
})
export class AzionSdkModule {}
