import { createAction, props } from '@ngrx/store';
import { weatherDataResponse } from 'src/app/models/weatherDataResponse';

export const setCurrentWeatherData = createAction(
  '[Weather Data] Set',
  props<{ payload: string }>()
);
export const setCurrentWeatherDataSuccess = createAction(
  '[Weather Data] Set Success',
  props<{ payload: weatherDataResponse }>()
);
