import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSearchComponent } from './location-search.component';
import { MockModule } from 'ng-mocks';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationsService } from '../../services/locations/locations.service';
import { of } from 'rxjs';

describe('LocationSearchComponent', () => {
  let component: LocationSearchComponent;
  let fixture: ComponentFixture<LocationSearchComponent>;
  let locationsServiceMock: jasmine.SpyObj<LocationsService>;

  beforeEach(() => {
    locationsServiceMock = jasmine.createSpyObj('locationsServiceMock', [
      'getAllCities',
    ]);
    locationsServiceMock.getAllCities.and.returnValue(of(['Tbilisi']));

    TestBed.overrideComponent(LocationSearchComponent, {
      add: {
        imports: [MockModule(FormsModule), MockModule(ReactiveFormsModule)],
        providers: [
          { provide: LocationsService, useValue: locationsServiceMock },
        ],
      },
      remove: {
        imports: [ReactiveFormsModule, FormsModule],
        providers: [LocationsService],
      },
    });
    fixture = TestBed.createComponent(LocationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllCities', () => {
    component.ngOnInit();
    expect(locationsServiceMock.getAllCities).toHaveBeenCalled();
  });

  it('should call locationConfirm.emit on submit with locationsForm value', () => {
    const emitSpy = spyOn(component.locationConfirm, 'emit');
    component.locationsForm.setValue({ city: "Tbilisi" });
    component.onSubmit();

    expect(emitSpy).toHaveBeenCalledWith('Tbilisi');
  });
});
