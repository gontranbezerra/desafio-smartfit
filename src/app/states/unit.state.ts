import { Injectable } from '@angular/core';

import { HOUR_INDEX, OPENING_HOURS, UnitLocation, Weekdays } from '@models/unit';

import { UnitService } from '@services/unit.service';

import { BehaviorSubject, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnitState {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _units$ = new BehaviorSubject<UnitLocation[]>([]);

  constructor(private unitsService: UnitService) {}

  loading$: Observable<boolean> = this._loading$.asObservable();
  units$: Observable<UnitLocation[]> = this._units$.asObservable();

  load(values: Partial<{ hour: HOUR_INDEX; showClosed: boolean }>): void {
    this._loading$.next(true);
    this.unitsService
      .listAllUnitsLocal()
      .pipe(take(1))
      .pipe(this.filterUnits(values))
      .subscribe({
        next: (units: UnitLocation[]) => {
          this._loading$.next(false);
          this.updateUnits(units);
        },
        error: (error) => {
          this._loading$.next(false);
          this.loadExternal(values);
          console.error(error);
        },
      });
  }

  clean(): void {
    this.updateUnits([]);
  }

  private loadExternal(values: Partial<{ hour: HOUR_INDEX; showClosed: boolean }>): void {
    this._loading$.next(true);
    this.unitsService
      .listAllUnitsExternal()
      .pipe(take(1))
      .pipe(this.filterUnits(values))
      .subscribe({
        next: (units: UnitLocation[]) => {
          this._loading$.next(false);
          this.updateUnits(units);
        },
        error: (error) => {
          this._loading$.next(false);
          console.error(error);
        },
      });
  }

  private updateUnits(units: UnitLocation[]): void {
    this._units$.next(units);
  }

  private filterUnits(values: Partial<{ hour: HOUR_INDEX; showClosed: boolean }>) {
    const USER_OPEN = parseInt(OPENING_HOURS[<HOUR_INDEX>values.hour].first, 10);
    const USER_CLOSE = parseInt(OPENING_HOURS[<HOUR_INDEX>values.hour].last, 10);
    const TODAYS_WEEKDAY = this.transformWeekday(new Date().getDay());

    return map((units: UnitLocation[]) => {
      const unitFiltered = units.filter((unit: UnitLocation) => {
        if (!unit.schedules) return false;

        for (const element of unit.schedules) {
          const SCHEDULE_HOUR = element.hour;
          const SCHEDULE_WEEKDAY = element.weekdays;

          if (SCHEDULE_WEEKDAY === TODAYS_WEEKDAY && SCHEDULE_HOUR != 'Fechada') {
            const [UNIT_OPEN_HOUR, UNIT_CLOSE_HOUR] = SCHEDULE_HOUR.split(' às ');
            const UNIT_OPEN = parseInt(UNIT_OPEN_HOUR.replace('h', ''), 10);
            const UNIT_CLOSE = parseInt(UNIT_CLOSE_HOUR.replace('h', ''), 10);

            if (UNIT_OPEN < USER_CLOSE && UNIT_CLOSE > USER_OPEN) {
              return true;
            } else {
              return false;
            }
          }
        }

        return false;
      });

      console.log(unitFiltered.map(({ title, schedules }) => ({ title, schedules })));

      if (values.showClosed) {
        return unitFiltered;
      } else {
        return unitFiltered.filter((unit: UnitLocation) => unit.opened === true);
      }
    });
  }

  private transformWeekday(weekday: number): Weekdays {
    switch (weekday) {
      case 0:
        return Weekdays.Dom;
      case 6:
        return Weekdays.Sáb;
      default:
        return Weekdays.SegÀSex || Weekdays.SegÀsSex;
    }
  }
}
