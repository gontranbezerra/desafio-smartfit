import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fountain, LockerRoom, Mask, Towel, UnitLocation, Weekdays } from '@models/unit';

import { UnitCardComponent } from './unit-card.component';

describe('UnitCardComponent', () => {
  let component: UnitCardComponent;
  let fixture: ComponentFixture<UnitCardComponent>;

  let expectedUnit: UnitLocation;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitCardComponent],
    }).compileComponents();

    expectedUnit = {
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
    };

    fixture = TestBed.createComponent(UnitCardComponent);
    component = fixture.componentInstance;
    
    fixture.componentRef.setInput('unit', expectedUnit);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
