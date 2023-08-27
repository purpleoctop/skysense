import { createAction, props } from '@ngrx/store';
import { tempUnit } from 'src/app/models/temperatureUnits';

export const setTemperatureUnit = createAction(
  '[Temp Unit] Set',
  props<{ payload: tempUnit }>()
);

