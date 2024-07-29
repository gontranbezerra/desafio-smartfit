import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fountain, LockerRoom, Mask, Towel, UnitLocation, Weekdays } from '@models/unit';

import { UnitsListComponent } from './units-list.component';

describe('UnitsListComponent', () => {
  let component: UnitsListComponent;
  let fixture: ComponentFixture<UnitsListComponent>;

  let expectedUnitLocations: UnitLocation[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitsListComponent],
    }).compileComponents();

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

    fixture = TestBed.createComponent(UnitsListComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('units', expectedUnitLocations);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
