import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempSwitcherComponent } from './temp-switcher.component';

describe('TempSwitcherComponent', () => {
  let component: TempSwitcherComponent;
  let fixture: ComponentFixture<TempSwitcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TempSwitcherComponent]
    });
    fixture = TestBed.createComponent(TempSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
