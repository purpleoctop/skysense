import { createFeatureSelector } from '@ngrx/store';

export interface AppState {
  favorites: string[];
}

export const getFavorites = createFeatureSelector<{ favorites: string[] }>(
  'favorites'
);
