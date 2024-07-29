import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment.development';

import { UnitLocation, UnitResponse } from '@models/unit';

import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private localAPI = environment.localAPI;
  private externalAPI = environment.externalAPI;

  constructor(private http: HttpClient) {}

  listAllUnitsLocal(allUnits: boolean = true): Observable<UnitLocation[]> {
    if (allUnits) {
      return this.http.get<UnitLocation[]>(`${this.localAPI}/locations`).pipe(catchError(this.handleError));
    }
    return this.http.get<UnitLocation[]>(`${this.localAPI}/locations?opened=true`).pipe(catchError(this.handleError));
  }

  listAllUnitsExternal(allUnits: boolean = true): Observable<UnitLocation[]> {
    if (allUnits) {
      return this.http.get<UnitResponse>(`${this.externalAPI}/locations.json`).pipe(
        catchError(this.handleError),
        map((data: UnitResponse) => data.locations)
      );
    }
    return this.http.get<UnitResponse>(`${this.externalAPI}/locations.json`).pipe(
      catchError(this.handleError),
      map((data: UnitResponse) => data.locations.filter((location) => location.opened === true))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // return throwError(() => new Error('Something bad happened; please try again later.'));
    return throwError(() => error);
  }
}
