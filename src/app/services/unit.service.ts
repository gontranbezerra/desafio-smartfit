import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment.development';

import { UnitLocation, UnitResponse } from '@models/unit';

import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private localAPI = environment.localAPI;
  private externalAPI = environment.externalAPI;

  constructor(private http: HttpClient) {}

  listAllUnitsLocal(allUnits: boolean = true): Observable<UnitLocation[]> {
    if (allUnits) {
      return this.http.get<UnitLocation[]>(`${this.localAPI}/locations`);
    }
    return this.http.get<UnitLocation[]>(
      `${this.localAPI}/locations?opened=true`
    );
  }

  listAllUnitsExternal(allUnits: boolean = true): Observable<UnitLocation[]> {
    if (allUnits) {
      return this.http
        .get<UnitResponse>(`${this.externalAPI}/locations.json`)
        .pipe(map((data: UnitResponse) => data.locations));
    }
    return this.http
      .get<UnitResponse>(`${this.externalAPI}/locations.json`)
      .pipe(
        map((data: UnitResponse) =>
          data.locations.filter((location) => location.opened === true)
        )
      );
  }
}
