import { Injectable } from '@nestjs/common';
import { BaseService } from '../common';
import { EdgeApplicationDto } from './dtos/edge.dto';
import { firstValueFrom, map } from 'rxjs';
import { EdgeApplicationCreateDto, EdgeApplicationUpdateDto } from './dtos';
import { HttpService } from '@nestjs/axios';

/**
 * A class service to operate over edge application on Azion (Manager)
 */
@Injectable()
export class EdgeService extends BaseService {
  constructor(private readonly http: HttpService) {
    super();
    this.url = `${this.url}/edge_applications`;
  }

  /** Service to create a new edge application
   * @param data EdgeApplicationCreateDto
   * @returns Promise<EdgeApplicationDto>
   */
  async create(data: EdgeApplicationCreateDto): Promise<EdgeApplicationDto> {
    const result = await firstValueFrom(
      this.http
        .post(this.url, data, this.config)
        .pipe(map((x) => x.data.results)),
    );
    return result;
  }

  /** Service to update a edge application
   * @param data EdgeApplicationUpdateDto
   * @returns Promise<EdgeApplicationDto>
   */
  async update(data: EdgeApplicationUpdateDto): Promise<EdgeApplicationDto> {
    const result = await firstValueFrom(
      this.http
        .patch(`${this.url}/${data.id}`, data, this.config)
        .pipe(map((x) => x.data.results)),
    );

    return result;
  }

  /** Service to find one edge application by id
   * @param id string
   * @returns Promise<EdgeApplicationDto>
   */
  async find_one(id: string): Promise<EdgeApplicationDto> {
    const result = await firstValueFrom(
      this.http
        .get(`${this.url}/${id}`, this.config)
        .pipe(map((x) => x.data.results)),
    );
    return result;
  }

  /** Service to delete a adge application by id
   * @param id string
   * @returns Promise<EdgeApplicationDto>
   */
  async delete(id: string): Promise<void> {
    const result = await firstValueFrom(
      this.http
        .delete(`${this.url}/${id}`, this.config)
        .pipe(map((x) => x.data.results)),
    );
    return result;
  }
}
