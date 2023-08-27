import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { weatherDataResponse } from '../../models/weatherDataResponse';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
  standalone: true,
  imports: [NgIf],
})
export class WeatherCardComponent {
  @Input() displayCelsius: boolean = true;
  @Input() weatherData: weatherDataResponse
   = {
    location: {
      name: 'London',
      region: 'City of London, Greater London',
      country: 'United Kingdom',
      lat: 51.52,
      lon: -0.11,
      tz_id: 'Europe/London',
      localtime_epoch: 1693070709,
      localtime: '2023-08-26 18:25',
    },
    current: {
      last_updated_epoch: 1693070100,
      last_updated: '2023-08-26 18:15',
      temp_c: 17,
      temp_f: 62.6,
      is_day: 1,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
        code: 1003,
      },
      wind_mph: 4.3,
      wind_kph: 6.8,
      wind_degree: 220,
      wind_dir: 'SW',
      pressure_mb: 1008,
      pressure_in: 29.77,
      precip_mm: 2.3,
      precip_in: 0.09,
      humidity: 77,
      cloud: 50,
      feelslike_c: 17,
      feelslike_f: 62.6,
      vis_km: 10,
      vis_miles: 6,
      uv: 4,
      gust_mph: 8.5,
      gust_kph: 13.7,
    },
  };
}
