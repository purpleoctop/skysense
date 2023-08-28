import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { WeatherCardComponent } from '../../components/weather-card/weather-card.component';
import { LocationSearchComponent } from '../../components/location-search/location-search.component';
import { TempSwitcherComponent } from '../../components/temp-switcher/temp-switcher.component';
import { MockComponent } from 'ng-mocks';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { GetCurrentWeather } from 'src/app/store/current-weather-store/current.selector';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let storeMock: jasmine.SpyObj<Store>;
  let mockWeatherData = {
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
    storeMock = jasmine.createSpyObj('locationsServiceMock', [
      'select',
      'dispatch',
    ]);
    storeMock.select.and.returnValue(of(mockWeatherData));

    TestBed.overrideComponent(HomeComponent, {
      remove: {
        imports: [
          WeatherCardComponent,
          LocationSearchComponent,
          TempSwitcherComponent,
        ],
      },
      add: {
        imports: [
          MockComponent(WeatherCardComponent),
          MockComponent(LocationSearchComponent),
          MockComponent(TempSwitcherComponent),
        ],
        providers: [{ provide: Store, useValue: storeMock }],
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

  it('should dispatch from store on getLocationData', () => {
    component.getLocationData('tbilisi');
    expect(storeMock.dispatch).toHaveBeenCalled();
  });
});
