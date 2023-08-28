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

type reverseGeocodingResponse = {
  results: {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[];
    }[];
    formatted_address: string;
    geometry: { location: { lat: number; lng: number } };
    location_type: string;
    viewPort: {
      northeast: { lat: number; lng: number };
      southwest: { lat: number; lng: number };
    };
    place_id: string;
    types: string[];
  }[];
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
    return this.http
      .get<reverseGeocodingResponse>(url)
      .pipe(map((res) => this.getCityname(res)));
  }

  private getCityname(response: reverseGeocodingResponse): string {
    return response.results
      .filter((addresses) => addresses.types.includes('locality'))[0]
      .address_components.filter((addr) => addr.types.includes('locality'))[0]
      .long_name;
  }
}
