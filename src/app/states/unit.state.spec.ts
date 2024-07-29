import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { Fountain, LockerRoom, Mask, Towel, UnitLocation, Weekdays } from '@models/unit';

import { UnitService } from '@services/unit.service';

import { of, throwError } from 'rxjs';

import { UnitState } from './unit.state';

describe('UnitState', () => {
  let unitServiceSpy: jasmine.SpyObj<UnitService>;
  let service: UnitState;
  let unitServiceMock: jasmine.SpyObj<UnitService>;

  let expectedUnitLocations: UnitLocation[];

  beforeEach(() => {
    unitServiceSpy = jasmine.createSpyObj('UnitService', ['listAllUnitsLocal', 'listAllUnitsExternal']);

    TestBed.configureTestingModule({
      providers: [provideHttpClient(), UnitState, { provide: UnitService, useValue: unitServiceSpy }],
    });
    service = TestBed.inject(UnitState);
    unitServiceMock = TestBed.inject(UnitService) as jasmine.SpyObj<UnitService>;
  });

  expectedUnitLocations = [
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
          weekdays: Weekdays.SegÀSex,
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load local units and update loading state', () => {
    unitServiceMock.listAllUnitsLocal.and.returnValue(of(expectedUnitLocations));

    service.load({ hour: 'morning', showClosed: true });
    service['updateUnits'](expectedUnitLocations);

    expect(unitServiceMock.listAllUnitsLocal).toHaveBeenCalled();
    service.units$.subscribe((units) => {
      expect(units).toEqual(expectedUnitLocations);
    });
  });

  it('should load external units on local units load failure', () => {
    unitServiceMock.listAllUnitsLocal.and.returnValue(throwError(() => new Error('Local units load error')));
    unitServiceMock.listAllUnitsExternal.and.returnValue(of(expectedUnitLocations));

    service.load({ hour: 'morning', showClosed: true });
    service['updateUnits'](expectedUnitLocations);

    expect(unitServiceMock.listAllUnitsLocal).toHaveBeenCalled();
    expect(unitServiceMock.listAllUnitsExternal).toHaveBeenCalled();

    service.units$.subscribe((units) => {
      expect(units).toEqual(expectedUnitLocations);
    });
  });

  it('should clean units', () => {
    service.clean();
    service['updateUnits']([]);

    service.units$.subscribe((units) => {
      expect(units).toEqual([]);
    });
  });

  it('should filter units correctly', () => {
    const filterUnits = service['filterUnits']({ hour: 'morning', showClosed: false });

    expectedUnitLocations[0].schedules = [
      {
        weekdays: Weekdays.SegÀSex,
        hour: '06h às 23h',
      },
      {
        weekdays: Weekdays.Sáb,
        hour: '06h às 23h',
      },
      {
        weekdays: Weekdays.Dom,
        hour: '06h às 23h',
      },
    ];

    filterUnits(of(expectedUnitLocations)).subscribe((filteredUnits) => {
      expect(filteredUnits.length).toBe(1);
    });
  });

  it("should do not filter units when doesn't have the 'schedules' property", () => {
    const filterUnits = service['filterUnits']({ hour: 'morning', showClosed: false });

    delete expectedUnitLocations[0].schedules;

    filterUnits(of(expectedUnitLocations)).subscribe((filteredUnits) => {
      expect(filteredUnits.length).toBe(0);
    });
  });

  it('should do not filter units when hour not exists', () => {
    const filterUnits = service['filterUnits']({ hour: 'morning', showClosed: false });

    expectedUnitLocations[0].schedules = [
      {
        weekdays: Weekdays.SegÀSex,
        hour: '04h às 05h',
      },
      {
        weekdays: Weekdays.Sáb,
        hour: '04h às 05h',
      },
      {
        weekdays: Weekdays.Dom,
        hour: '04h às 05h',
      },
    ];

    filterUnits(of(expectedUnitLocations)).subscribe((filteredUnits) => {
      expect(filteredUnits.length).toBe(0);
    });
  });

  it("should do not filter units when the 'schedules' property is empity", () => {
    const filterUnits = service['filterUnits']({ hour: 'morning', showClosed: false });

    expectedUnitLocations[0].schedules = [];

    filterUnits(of(expectedUnitLocations)).subscribe((filteredUnits) => {
      expect(filteredUnits.length).toBe(0);
    });
  });

  it('should filter day name', () => {
    let filterUnits = service['transformWeekday'](0);

    expect(filterUnits).toEqual(Weekdays.Dom);

    filterUnits = service['transformWeekday'](6);

    expect(filterUnits).toEqual(Weekdays.Sáb);

    filterUnits = service['transformWeekday'](1);

    expect(filterUnits).toEqual(Weekdays.SegÀSex || Weekdays.SegÀsSex);
  });
});
