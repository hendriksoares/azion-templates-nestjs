import { Injectable } from '@nestjs/common';
import { BaseService } from '../common';
import { HttpService } from '@nestjs/axios';
import { OriginDto } from './dtos/origin.dto';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class OriginsService extends BaseService {
  constructor(private readonly http: HttpService) {
    super();
    this.url = `${this.url}/edge_applications/:edge_application_id/origins`;
  }

  async find_by_edge(id: string): Promise<OriginDto[]> {
    const url = this.url.replace(':edge_application_id', id);

    const result = await firstValueFrom(
      this.http.get(url, this.config).pipe(map((x) => x.data.results)),
    );

    return result;
  }
}
