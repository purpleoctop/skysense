import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempSwitcherComponent } from './temp-switcher.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { tempUnit } from 'src/app/models/temperatureUnits';

describe('TempSwitcherComponent', () => {
  let component: TempSwitcherComponent;
  let fixture: ComponentFixture<TempSwitcherComponent>;
  let storeMock: jasmine.SpyObj<Store>;

  beforeEach(() => {
    storeMock = jasmine.createSpyObj('locationsServiceMock', [
      'select',
      'dispatch',
    ]);

    storeMock.select.and.returnValue(of(tempUnit.C))

    TestBed.overrideComponent(TempSwitcherComponent, {
      add: { providers: [{ provide: Store, useValue: storeMock }] },
    });
    fixture = TestBed.createComponent(TempSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select temperature unit from store', () => {
    component.ngOnInit();
    expect(storeMock.select).toHaveBeenCalled();
  });

  it('should set temperature unit to store', () => {
    component.updateTempValue();
    expect(storeMock.dispatch).toHaveBeenCalled();
  });
});
