import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocationSearchComponent } from '../../components/location-search/location-search.component';
import { TempSwitcherComponent } from '../../components/temp-switcher/temp-switcher.component';
import { WeatherCardComponent } from '../../components/weather-card/weather-card.component';
import { tempUnit } from '../../models/temperatureUnits';
import { weatherDataResponse } from '../../models/weatherDataResponse';
import { setCurrentWeatherData } from '../../store/current-weather-store/current.actions';
import { GetCurrentWeather } from '../../store/current-weather-store/current.selector';
import { getTemperatureUnit } from '../../store/unit-store/unit.selectors';
import { NgFor, NgIf } from '@angular/common';
import { LocationsService } from '../../services/locations/locations.service';
import { Subject, takeUntil } from 'rxjs';
import { getFavorites } from '../../store/favorites/favorites.selector';
import {
  removeFavorites,
  setFavorites,
} from '../../store/favorites/favorites.actions';
import { WeatherService } from 'src/app/services/weather/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    WeatherCardComponent,
    LocationSearchComponent,
    TempSwitcherComponent,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  displayCelsius = true;
  currentWeather!: weatherDataResponse;
  favoriteLocations!: string[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  error!: string;

  constructor(
    private store: Store,
    private locationsService: LocationsService,
    private weatherService: WeatherService
  ) {}
  ngOnInit() {
    this.store
      .select(GetCurrentWeather)
      .pipe(takeUntil(this.destroy$))
      .subscribe((weather) => {
        if (!weather.currentWeather?.location) {
          this.getCurrentlocation();
        } else {
          this.currentWeather = weather.currentWeather;
        }
        this.error = '';
      });
    this.store
      .select(getTemperatureUnit)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (unit) => (this.displayCelsius = unit.tempUnit === tempUnit.C)
      );

    this.store
      .select(getFavorites)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (favorites) => (this.favoriteLocations = favorites?.favorites)
      );

    this.getErrors();
  }

  setFavorite(city: string) {
    this.store.dispatch(setFavorites({ payload: city }));
  }

  removeFavorite(city: string) {
    this.store.dispatch(removeFavorites({ payload: city }));
  }

  setLocationData(city: string) {
    this.store.dispatch(setCurrentWeatherData({ payload: city }));
  }

  getErrors() {
    this.weatherService.errors?.subscribe((error: string) => {
      this.error = error;
    });
  }
  private getCurrentlocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) =>
        this.getReverseGeocoding(
          location.coords.latitude,
          location.coords.longitude
        )
      );
    }
  }

  private getReverseGeocoding(lat: number, lng: number) {
    this.locationsService
      .getReverseGeocoding(lat, lng)
      .pipe(takeUntil(this.destroy$))
      .subscribe((city: string) => this.setLocationData(city));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
