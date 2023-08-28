import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  displayCelsius: boolean = true;
  currentWeather!: weatherDataResponse;

  constructor(private store: Store) {}
  ngOnInit() {
    this.store.select(GetCurrentWeather).subscribe((weather) => {
      if (!weather.currentWeather?.location) {
        this.getCurrentlocation();
      } else {
        this.currentWeather = weather.currentWeather;
      }
    });
    this.store
      .select(getTemperatureUnit)
      .subscribe(
        (unit) => (this.displayCelsius = unit.tempUnit === tempUnit.C)
      );
  }

 private getCurrentlocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(console.log);
    }
  }

  getLocationData(city: string) {
    this.store.dispatch(setCurrentWeatherData({ payload: city }));
  }
}
