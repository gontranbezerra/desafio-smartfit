import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UnitService } from './unit.service';

describe('UnitService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: UnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = TestBed.inject(UnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
