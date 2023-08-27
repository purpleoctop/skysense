import { createFeatureSelector } from '@ngrx/store';
import { weatherDataResponse } from 'src/app/models/weatherDataResponse';

export interface AppState {
  currentWeather: weatherDataResponse;
}

export const GetCurrentWeather =
  createFeatureSelector<AppState>('currentWeather');
