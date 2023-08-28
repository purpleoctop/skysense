import { createAction, props } from '@ngrx/store';

export const setFavorites = createAction(
  '[Favorite] Set',
  props<{ payload: string }>()
);

export const removeFavorites = createAction(
  '[Favorite] Remove',
  props<{ payload: string }>()
);

