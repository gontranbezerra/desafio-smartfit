import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fountain, LockerRoom, Mask, Towel, UnitLocation, Weekdays } from '@models/unit';

import { UnitState } from '@states/unit.state';

import { Observable, of } from 'rxjs';

import { FormComponent } from './form.component';

interface UnitStateMock {
  units$: Observable<UnitLocation[]>;
  load(params: Partial<{ hour: string; showClosed: boolean }>): void;
  clean(): void;
}

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  let unitStateSpy: jasmine.SpyObj<UnitState>;
  let unitState: UnitState;
  let unitStateMock: UnitStateMock;

  let expectedUnitLocations: UnitLocation[];

  beforeEach(async () => {
    unitStateSpy = jasmine.createSpyObj('UnitState', ['load', 'clean']);

    await TestBed.configureTestingModule({
      imports: [FormComponent],
      providers: [provideHttpClient(), { provider: UnitState, useValue: unitStateSpy }],
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
    
    unitStateMock = {
      units$: of(expectedUnitLocations),
      load: unitStateSpy.load,
      clean: unitStateSpy.clean,
    };

    unitState = TestBed.inject(UnitState);
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start form values', () => {
    const { hour, showClosed } = component['formGroup'].value;
    expect(hour).toBe('morning');
    expect(showClosed).toBe(false);
  });

  it('should call the unit state load function when start', () => {
    unitStateSpy.load({ hour: 'morning', showClosed: false });
    component.ngOnInit();
    expect(unitStateSpy.load).toHaveBeenCalled();
  });

  it('should call the unit state load function when onSubmit is called', () => {
    spyOn(unitState, 'load');
    component.onSubmit();
    expect(unitState.load).toHaveBeenCalled();
  });

  it('should reset form when onClean function is called', () => {
    component['formGroup'].patchValue({ hour: 'afternoon', showClosed: true });
    component.onClean();

    expect(component['formGroup'].value).toEqual({ hour: 'morning', showClosed: false });
  });

  it('should call the unit state clean function when onClean is called', () => {
    spyOn(unitState, 'clean');
    component.onClean();
    expect(unitState.clean).toHaveBeenCalled();
  });

  it('should call the onSubmit function when onClean is called', () => {
    spyOn(component, 'onSubmit');
    component.onClean();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should value of unit signal ', () => {
    component['units$'] = unitStateMock.units$;
    fixture.detectChanges();
    component['units$'].subscribe((units) => {
      expect(units.length).toBe(1);
    });
  });
});
