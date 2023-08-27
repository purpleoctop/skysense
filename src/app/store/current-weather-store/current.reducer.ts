import { State, createReducer, on } from '@ngrx/store';
import { setCurrentWeatherDataSuccess } from './current.actions';
import { weatherDataResponse } from 'src/app/models/weatherDataResponse';
import { AppState } from './current.selector';

export const initialState: AppState = {
  currentWeather: {} as weatherDataResponse,
};

export const CurrentWeatherReducer = createReducer(
  initialState,
  on(setCurrentWeatherDataSuccess, (state, { payload }) => ({
    ...state,
    currentWeather: payload,
  }))
);
