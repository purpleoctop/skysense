import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { WeatherCardComponent } from '../../components/weather-card/weather-card.component';
import { LocationSearchComponent } from '../../components/location-search/location-search.component';
import { TempSwitcherComponent } from '../../components/temp-switcher/temp-switcher.component';
import { MockComponent } from 'ng-mocks';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { LocationsService } from 'src/app/services/locations/locations.service';
import { WeatherService } from 'src/app/services/weather/weather.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let storeMock: jasmine.SpyObj<Store>;
  let locationsServiceMock: jasmine.SpyObj<LocationsService>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>;

  const mockWeatherData = {
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

  beforeEach(() => {
    storeMock = jasmine.createSpyObj('storeMock', ['select', 'dispatch']);
    storeMock.select.and.returnValue(of(mockWeatherData));

    locationsServiceMock = jasmine.createSpyObj('locationsServiceMock', [
      'getReverseGeocoding',
    ]);

    weatherServiceMock = jasmine.createSpyObj('weatherServiceMock', [
      'getWeatherDataByCity',
    ]);

    TestBed.overrideComponent(HomeComponent, {
      remove: {
        imports: [
          WeatherCardComponent,
          LocationSearchComponent,
          TempSwitcherComponent,
          HttpClientModule,
        ],
      },
      add: {
        imports: [
          MockComponent(WeatherCardComponent),
          MockComponent(LocationSearchComponent),
          MockComponent(TempSwitcherComponent),
          HttpClientModule,
        ],
        providers: [
          { provide: Store, useValue: storeMock },
          { provide: LocationsService, useValue: locationsServiceMock },
          { provide: WeatherService, useValue: weatherServiceMock },
        ],
      },
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select currentWeather from store', () => {
    component.ngOnInit();
    expect(storeMock.select).toHaveBeenCalled();
  });

  it('should dispatch from store on setLocationData', () => {
    component.setLocationData('tbilisi');
    expect(storeMock.dispatch).toHaveBeenCalled();
  });
});
