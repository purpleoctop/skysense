import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import routes from './app/routes';
import { AppComponent } from './app/app.component';
import { WeatherService } from './app/services/weather/weather.service';
import { LocationsService } from './app/services/locations/locations.service';
import { OpenaiService } from './app/services/openAi/openai.service';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(RouterModule.forRoot(routes))],
}).catch((err) => console.error(err));
