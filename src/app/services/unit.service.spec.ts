import { HttpClient, HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '@environments/environment.development';

import { Fountain, LockerRoom, Mask, Towel, UnitLocation, UnitResponse, Weekdays } from '@models/unit';

import { of } from 'rxjs';

import { UnitService } from './unit.service';

describe('UnitService', () => {
  let httpTesting: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: UnitService;
  let unitService: UnitService;

  let expectedUnitsLocations: UnitLocation[];
  let expectedUnitsResponse: UnitResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    expectedUnitsLocations = [
      {
        id: 10998878976092,
        title: 'GV Shopping',
        content: '\n<p>Rua Sete de Setembro, 3500 &#8211; Centro<br>Governador Valadares, MG</p>\n',
        opened: true,
        mask: Mask.Recommended,
        towel: Towel.Required,
        fountain: Fountain.Partial,
        locker_room: LockerRoom.Allowed,
        schedules: [
          {
            weekdays: Weekdays.SegÀsSex,
            hour: '06h às 23h',
          },
          {
            weekdays: Weekdays.Sáb,
            hour: '09h às 18h',
          },
          {
            weekdays: Weekdays.Dom,
            hour: 'Fechada',
          },
        ],
      },
    ];
    expectedUnitsResponse = {
      current_country_id: 1,
      wp_total: 116,
      total: 167,
      success: true,
      locations: expectedUnitsLocations,
    };

    httpTesting = TestBed.inject(HttpTestingController);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    unitService = new UnitService(httpClientSpy);

    service = TestBed.inject(UnitService);
  });

  it('should be created', () => {
    expect(unitService).toBeTruthy();
  });

  describe('#listAllUnitsLocal', () => {
    it('should return all local units when allUnits is true', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(expectedUnitsLocations));
      unitService.listAllUnitsLocal(true).subscribe({
        next: (units) => {
          expect(units).toEqual(expectedUnitsLocations);
          done();
        },
        error: done.fail,
      });
      expect(httpClientSpy.get.calls.count()).toBe(1);
    });

    it('should make a request from local API that matches the given URL when allUnits is true', () => {
      service.listAllUnitsLocal(true).subscribe((units) => {
        expect(units).toEqual(expectedUnitsLocations);
      });
      let req = httpTesting.expectOne(`${environment.localAPI}/locations`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedUnitsLocations);
    });

    it('should make a request from local API that matches the given URL when allUnits is false', () => {
      service.listAllUnitsLocal(false).subscribe((units) => {
        expect(units).toEqual(expectedUnitsLocations);
      });
      let req = httpTesting.expectOne(`${environment.localAPI}/locations?opened=true`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedUnitsLocations);
    });

    it('should handle 404 error when listing local units', () => {
      service.listAllUnitsLocal().subscribe({
        next: (units) => fail('expected an error, no units'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(404);
        },
      });
      const req = httpTesting.expectOne(`${environment.localAPI}/locations`);
      expect(req.request.method).toBe('GET');
      req.flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('#listAllUnitsExternal', () => {
    it('should return all external units when allUnits is true', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(expectedUnitsResponse));
      unitService.listAllUnitsExternal(true).subscribe({
        next: (units) => {
          expect(units).toEqual(expectedUnitsLocations);
          done();
        },
        error: done.fail,
      });
      expect(httpClientSpy.get.calls.count()).toBe(1);
    });

    it('should make a request from external API that matches the given URL when allUnits is true', () => {
      service.listAllUnitsExternal(true).subscribe((units) => {
        expect(units).toEqual(expectedUnitsLocations);
      });
      let req = httpTesting.expectOne(`${environment.externalAPI}/locations.json`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedUnitsResponse);
    });

    it('should make a request from external API that matches the given URL when allUnits is false', () => {
      service.listAllUnitsExternal(false).subscribe((units) => {
        expect(units).toEqual(expectedUnitsLocations);
      });
      let req = httpTesting.expectOne(`${environment.externalAPI}/locations.json`);
      expect(req.request.method).toBe('GET');

      req.flush(expectedUnitsResponse);
    });
  });

  it('should handle 404 error when listing external units', () => {
    service.listAllUnitsExternal(true).subscribe({
      next: (units) => fail('expected an error, no units'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(404);
      },
    });
    const req = httpTesting.expectOne(`${environment.externalAPI}/locations.json`);
    expect(req.request.method).toBe('GET');
    req.flush('404 error', { status: 404, statusText: 'Not Found' });
  });
});
