import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { weatherDataResponse } from '../../models/weatherDataResponse';

const API_KEY = '446e30bc928c4f6a8fc164310232608';
const BASE_URL = 'http://api.weatherapi.com/v1';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  errors: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {}

  getWeatherDataByCity(city: string): Observable<weatherDataResponse> {
    const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`;
    return this.http.get<weatherDataResponse>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errors.next(error.error.error.message);
        return throwError(() => new Error(error.error.error.message));
      })
    );
  }
}
