import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, switchMap } from 'rxjs';
import { WeatherService } from '../../services/weather/weather.service';
import {
  setCurrentWeatherData,
  setCurrentWeatherDataSuccess,
} from './current.actions';

@Injectable()
export class CurrentWeatherEffect {
  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setCurrentWeatherData),
      switchMap(({ payload }) =>
        this.weatherService.getWeatherDataByCity(payload).pipe(
          map((data) => setCurrentWeatherDataSuccess({ payload: data })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
