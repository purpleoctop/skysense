import { createReducer, on } from '@ngrx/store';
import { removeFavorites, setFavorites } from './favorites.actions';
import { AppState } from './favorites.selector';

export const initialState: AppState = {
  favorites: ['Tbilisi', 'Batumi', 'Wjnkds', 'sfnkn', 'knewjfbi', 'beqhb', 'iebur'],
};

export const FavoritesReducer = createReducer(
  initialState,

  on(setFavorites, (state, { payload }) => ({
    ...state,
    favorites: [...state.favorites, payload],
  })),

  on(removeFavorites, (state, { payload }) => ({
    ...state,
    favorites: state.favorites.filter((item) => item !== payload),
  }))
);
