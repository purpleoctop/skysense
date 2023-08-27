import { createAction, props } from '@ngrx/store';
import { tempUnit } from '../../models/temperatureUnits';

export const setTemperatureUnit = createAction(
  '[Temp Unit] Set',
  props<{ payload: tempUnit }>()
);

