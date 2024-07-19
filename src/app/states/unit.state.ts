import { Injectable } from '@angular/core';

import { UnitLocation } from '@models/unit';

import { UnitService } from '@services/unit.service';

import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnitState {
  private _units$ = new BehaviorSubject<UnitLocation[]>([]);

  constructor(private unitsService: UnitService) {}

  units$: Observable<UnitLocation[]> = this._units$.asObservable();

  loadAllUnits(allUnits: boolean = true) {
    this.unitsService
      .listAllUnitsLocal(allUnits)
      .pipe(take(1))
      .subscribe({
        next: (units: UnitLocation[]) => this.updateUnits(units),
        error: (error) => {
          this.loadExternal(allUnits);
          console.error(error);
        },
      });
  }

  clean() {
    this.updateUnits([]);
  }

  private loadExternal(allUnits: boolean = true) {
    this.unitsService
      .listAllUnitsExternal(allUnits)
      .pipe(take(1))
      .subscribe({
        next: (units: UnitLocation[]) => this.updateUnits(units),
        error: (error) => console.error(error),
      });
  }

  private updateUnits(units: UnitLocation[]): void {
    this._units$.next(units);
  }
}
