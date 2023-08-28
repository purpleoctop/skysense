import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { weatherDataResponse } from '../../models/weatherDataResponse';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherCardComponent {
  @Input() displayCelsius: boolean = true;
  @Input() weatherData!: weatherDataResponse;
}
