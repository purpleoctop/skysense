import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

type location = {
  country: string;
  cities: string[];
};
type locationsResponse = {
  data: location[];
};
@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  constructor(private http: HttpClient) {}

  getAllCities(): Observable<string[]> {
    const url = 'https://countriesnow.space/api/v0.1/countries';
    return this.http
      .get<locationsResponse>(url)
      .pipe(map((locations) => locations.data.map((loc) => loc.cities).flat()));
  }
}
