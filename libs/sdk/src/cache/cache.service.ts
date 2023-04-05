import { Injectable } from '@nestjs/common';
import { BaseService } from '../common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { CacheCreateDto } from './dtos/create.dto';
import { CacheDto } from './dtos/cache.dto';
import { CacheUpdateDto } from './dtos/update.dto';

/**
 * A class service to manage cache on Azion
 */
@Injectable()
export class CacheService extends BaseService {
  constructor(private readonly http: HttpService) {
    super();
    this.url = `${this.url}/edge_applications/:edge_application_id/cache_settings`;
  }

  /** Service to register a new cache
   * @param data CacheCreateDto
   * @param id string
   * @returns Promise<CacheDto>
   */
  async create(data: CacheCreateDto, id: string): Promise<CacheDto> {
    const url = this.url.replace(':edge_application_id', id);
    const result = await firstValueFrom(
      this.http.post(url, data, this.config).pipe(map((x) => x.data.results)),
    );

    return result;
  }

  /** A service to find all cache by edge application
   * @param id string
   * @returns Promise<CacheDto>
   */
  async find_by_edge(id: string): Promise<CacheDto[]> {
    const url = this.url.replace(':edge_application_id', id);
    const result = await firstValueFrom(
      this.http.get(url, this.config).pipe(map((x) => x.data.results)),
    );
    return result;
  }

  /** A service to find all cache by edge application
   * @param cache_id string
   * @param edge_application_id string
   * @returns Promise<CacheDto>
   */
  async find_one(
    edge_application_id: string,
    cache_id: string,
  ): Promise<CacheCreateDto> {
    const url = `${this.url.replace(
      ':edge_application_id',
      edge_application_id,
    )}/${cache_id}`;
    const result = await firstValueFrom(
      this.http.get(url, this.config).pipe(map((x) => x.data.results)),
    );
    return result;
  }

  /** A service to update a cache
   * @param edge_application_id string
   * @param cache_id string
   * @param data CacheUpdateDto
   * @returns Promise<CacheDto>
   */
  async update(
    edge_application_id: string,
    cache_id: string,
    data: CacheUpdateDto,
  ): Promise<CacheDto> {
    const url = `${this.url.replace(
      ':edge_application_id',
      edge_application_id,
    )}/${cache_id}`;

    const result = await firstValueFrom(
      this.http.patch(url, data, this.config).pipe(map((x) => x.data.results)),
    );
    return result;
  }

  /** A service to delete a cache by id
   * @param cache_id string
   * @param edge_application_id string
   */
  async delete(edge_application_id: string, cache_id: string): Promise<void> {
    const url = `${this.url.replace(
      ':edge_application_id',
      edge_application_id,
    )}/${cache_id}`;

    await firstValueFrom(
      this.http.delete(url, this.config).pipe(map((x) => x.data.results)),
    );
  }
}
