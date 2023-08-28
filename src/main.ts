import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import routes from './app/routes';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { CurrentWeatherReducer } from './app/store/current-weather-store/current.reducer';
import { CurrentWeatherEffect } from './app/store/current-weather-store/current.effects';
import { provideEffects } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { TempUnitReducer } from './app/store/unit-store/unit.reducer';
import { FavoritesReducer } from './app/store/favorites/favorites.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes), HttpClientModule),
    provideStore({
      currentWeather: CurrentWeatherReducer,
      tempUnit: TempUnitReducer,
      favorites: FavoritesReducer,
    }),
    provideEffects([CurrentWeatherEffect]),
  ],
}).catch((err) => console.error(err));
