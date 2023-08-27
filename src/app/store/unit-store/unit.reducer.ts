import { createReducer, on } from '@ngrx/store';
import { AppState } from './unit.selectors';
import { setTemperatureUnit } from './unit.actions';
import { tempUnit } from '../../models/temperatureUnits';

export const initialState: AppState = {
  tempUnit: tempUnit.C,
};

export const TempUnitReducer = createReducer(
  initialState,
  on(setTemperatureUnit, (state, { payload }) => ({
    ...state,
    tempUnit: payload,
  }))
);
