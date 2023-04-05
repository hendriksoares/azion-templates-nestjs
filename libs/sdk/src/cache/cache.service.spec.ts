import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from './cache.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { CacheCreateDto } from './dtos/create.dto';
import { CacheUpdateDto } from './dtos/update.dto';

describe('# CacheService', () => {
  let service: CacheService;
  let http: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CacheService],
    })
      .overrideProvider(HttpService)
      .useValue({
        post: jest.fn().mockReturnValue({
          pipe: jest.fn().mockReturnValue(of({})),
        }),
        get: jest.fn().mockReturnValue({
          pipe: jest.fn().mockReturnValue(of({})),
        }),
        patch: jest.fn().mockReturnValue({
          pipe: jest.fn().mockReturnValue(of({})),
        }),
        delete: jest.fn().mockReturnValue({
          pipe: jest.fn().mockReturnValue(of({})),
        }),
      })
      .compile();

    service = module.get<CacheService>(CacheService);
    http = module.get<HttpService>(HttpService);
  });

  describe('## Should be defined ', () => {
    it('service was defined', () => {
      expect(service).toBeDefined();
    });
    it('create should be defined', () => {
      expect(service.create).toBeDefined();
    });
    it('find one should be defined', () => {
      expect(service.find_one);
    });
    it('find by edge should be defined', () => {
      expect(service.find_by_edge);
    });
    it('update should be defined', () => {
      expect(service.update);
    });
    it('delete should be defined', () => {
      expect(service.delete);
    });
  });

  describe('## Create', () => {
    beforeEach(async () => {
      await service.create({} as CacheCreateDto, '');
    });
    it('should be call external post api', () => {
      expect(http.post).toBeCalled();
    });
  });

  describe('## FindOne', () => {
    beforeEach(async () => {
      await service.find_one('', '');
    });
    it('should be call external get api', () => {
      expect(http.get).toBeCalled();
    });
  });

  describe('## Update', () => {
    beforeEach(async () => {
      await service.update('', '', {} as CacheUpdateDto);
    });
    it('should be call external patch api', () => {
      expect(http.patch).toBeCalled();
    });
  });

  describe('## Delete', () => {
    beforeEach(async () => {
      await service.delete('', '');
    });
    it('should be call external get api', () => {
      expect(http.delete).toBeCalled();
    });
  });
});
