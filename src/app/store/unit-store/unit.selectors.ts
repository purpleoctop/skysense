import { State, createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
  tempUnit: string;
}

export const getTemperatureUnit = createFeatureSelector<{tempUnit: string}>('tempUnit');
