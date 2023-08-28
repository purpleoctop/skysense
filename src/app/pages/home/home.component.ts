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
import { NgIf } from '@angular/common';
import { LocationsService } from '../../services/locations/locations.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    NgIf,
    WeatherCardComponent,
    LocationSearchComponent,
    TempSwitcherComponent,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  displayCelsius = true;
  currentWeather!: weatherDataResponse;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store,
    private locationsService: LocationsService
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
      });
    this.store
      .select(getTemperatureUnit)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (unit) => (this.displayCelsius = unit.tempUnit === tempUnit.C)
      );
  }

  editSavedLocations() {
    let locations: string[] = [];
    const savedLocations = this.getSavedLocations();
    if (savedLocations?.length) {
      const isAlreadyfav = this.searchItemInFavorites();
      if (isAlreadyfav) {
        locations = savedLocations.filter(
          (l: string) => l != this.currentWeather.location.name
        );
      } else {
        locations = [...savedLocations, this.currentWeather.location.name];
      }
    } else {
      locations = [this.currentWeather.location.name];
    }
    localStorage.setItem('favorites', JSON.stringify(locations));
  }

  getSavedLocations() {
    let locationsArr = [];
    const locationsFromStorage = localStorage.getItem('favorites');
    if (!!locationsFromStorage) {
      locationsArr = JSON.parse(locationsFromStorage);
    }
    return locationsArr;
  }
  setLocationData(city: string) {
    this.store.dispatch(setCurrentWeatherData({ payload: city }));
  }

  searchItemInFavorites() {
    const locations = this.getSavedLocations();
    const found = locations?.filter(
      (l: string) => this.currentWeather.location.name === l
    ).length;
    return found;
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
