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

  getReverseGeocoding(lat: number, lng: number) {
    const apiKey = 'AIzaSyB2Vbisk4wcNvNiPI8ZE5ak7rsqjjTX5DI';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${apiKey}`;
    return this.http.get<any>(url).pipe(map((res) => this.getCityname(res)));
  }

  private getCityname(response: any): string {
    return response.results
      .filter((addresses: any) => addresses.types.includes('locality'))[0]
      .address_components.filter((addr: any) =>
        addr.types.includes('locality')
      )[0].long_name;
  }
}
