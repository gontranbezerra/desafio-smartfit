import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment.development';

import { UnitResponse } from '@models/unit';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private unitsApi = environment.unitsApi;

  constructor(private http: HttpClient) {}

  getAllUnits(): Observable<UnitResponse> {
    return this.http.get<UnitResponse>(this.unitsApi);
  }
}
