import { Test, TestingModule } from '@nestjs/testing';
import { EdgeService } from './edge.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { EdgeApplicationCreateDto, EdgeApplicationUpdateDto } from './dtos';
import { map, of } from 'rxjs';

describe('# EdgeService', () => {
  let service: EdgeService;
  let http: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [EdgeService],
    })
      .overrideProvider(HttpService)
      .useValue({
        post: jest.fn().mockReturnValue({
          pipe: jest.fn().mockReturnValue(of(map((x: any) => x.data.results))),
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

    service = module.get<EdgeService>(EdgeService);
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
      await service.create({} as EdgeApplicationCreateDto);
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
      await service.update({} as EdgeApplicationUpdateDto);
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
