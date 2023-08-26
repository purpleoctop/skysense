import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { weatherDataResponse } from '../../models/weatherDataResponse';

const API_KEY = '446e30bc928c4f6a8fc164310232608';
const BASE_URL = 'http://api.weatherapi.com/v1';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherDataByCity(city: string): Observable<weatherDataResponse> {
    const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`;
    return this.http.get<weatherDataResponse>(url);
  }
}
