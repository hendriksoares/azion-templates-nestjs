import { Injectable } from '@nestjs/common';
import { BaseService } from '../common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { DomainCreateDto, DomainDto, DomainUpdateDto } from './dtos';

/**
 * A class service to manage domain on Azion
 */
@Injectable()
export class DomainService extends BaseService {
  constructor(private readonly http: HttpService) {
    super();
    this.url = `${this.url}/domains`;
  }

  /** Service to register a new domain
   * @param data DomainCreateDto
   * @returns Promise<DomainDto>
   */
  async create(data: DomainCreateDto): Promise<DomainDto> {
    const result = await firstValueFrom(
      this.http
        .post(this.url, data, this.config)
        .pipe(map((x) => x.data.results)),
    );

    return result;
  }

  /** A service to find one domain
   * @param id string
   * @returns Promise<DomainDto>
   */
  async find_one(id: string): Promise<DomainDto> {
    const result = await firstValueFrom(
      this.http
        .get(`${this.url}/${id}`, this.config)
        .pipe(map((x) => x.data.results)),
    );
    return result;
  }

  /** A service to update a domain
   * @param data DomainUpdateDto
   * @returns Promise<DomainDto>
   */
  async update(data: DomainUpdateDto): Promise<DomainDto> {
    const result = await firstValueFrom(
      this.http
        .patch(this.url, data, this.config)
        .pipe(map((x) => x.data.results)),
    );
    return result;
  }

  /** A servce to delete a domain by id
   * @param id string
   */
  async delete(id: string): Promise<void> {
    await firstValueFrom(
      this.http
        .delete(`${this.url}/${id}`, this.config)
        .pipe(map((x) => x.data.results)),
    );
  }
}
