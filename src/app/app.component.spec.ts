import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MockModule } from 'ng-mocks';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.overrideComponent(AppComponent, {
      remove: { imports: [RouterModule] },
      add: { imports: [MockModule(RouterModule)] },
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'skysense'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('skysense');
  });
});
