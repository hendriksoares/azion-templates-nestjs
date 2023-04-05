import { Injectable } from '@nestjs/common';
import { BaseService } from '../common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { RulesCreateDto } from './dtos/create.dto';
import { RulesDto } from './dtos/rules.dto';
import { RulesPhase } from '../common/enum';

/**
 * A class service to manage domain on Azion
 */
@Injectable()
export class RulesService extends BaseService {
  constructor(private readonly http: HttpService) {
    super();
    this.url = `${this.url}/edge_applications/:edge_application_id/rules_engine/:phase/rules`;
  }

  /** Service to register a new rule engine
   * @param data DomainCreateDto
   * @returns Promise<DomainDto>
   */
  async create(
    data: RulesCreateDto,
    phase: RulesPhase,
    edge_application_id: string,
  ): Promise<RulesDto> {
    let url = this.url.replace(':edge_application_id', edge_application_id);
    url = url.replace(':phase', phase);

    const result = await firstValueFrom(
      this.http.post(url, data, this.config).pipe(map((x) => x.data.results)),
    );

    return result;
  }
}
