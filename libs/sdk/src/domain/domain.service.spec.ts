import { Test, TestingModule } from '@nestjs/testing';
import { DomainService } from './domain.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { DomainCreateDto, DomainUpdateDto } from './dtos';

describe('# DomainService', () => {
  let service: DomainService;
  let http: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [DomainService],
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

    service = module.get<DomainService>(DomainService);
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
    it('update should be defined', () => {
      expect(service.update);
    });
    it('delete should be defined', () => {
      expect(service.delete);
    });
  });

  describe('## Create', () => {
    beforeEach(async () => {
      await service.create({} as DomainCreateDto);
    });
    it('should be call external post api', () => {
      expect(http.post).toBeCalled();
    });
  });

  describe('## FindOne', () => {
    beforeEach(async () => {
      await service.find_one('');
    });
    it('should be call external get api', () => {
      expect(http.get).toBeCalled();
    });
  });

  describe('## Update', () => {
    beforeEach(async () => {
      await service.update({} as DomainUpdateDto);
    });
    it('should be call external patch api', () => {
      expect(http.patch).toBeCalled();
    });
  });

  describe('## Delete', () => {
    beforeEach(async () => {
      await service.delete('');
    });
    it('should be call external get api', () => {
      expect(http.delete).toBeCalled();
    });
  });
});
