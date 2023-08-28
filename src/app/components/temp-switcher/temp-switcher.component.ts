import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tempUnit } from '../../models/temperatureUnits';
import { setTemperatureUnit } from '../../store/unit-store/unit.actions';
import { getTemperatureUnit } from '../../store/unit-store/unit.selectors';

@Component({
  selector: 'app-temp-switcher',
  templateUrl: './temp-switcher.component.html',
  styleUrls: ['./temp-switcher.component.css'],
  standalone: true,
})
export class TempSwitcherComponent {
  tempUnitControl!: FormControl;
  constructor(private store: Store) {}

  ngOnInit() {
    this.tempUnitControl = new FormControl();

    this.store.select(getTemperatureUnit).subscribe((value) => {
      this.tempUnitControl?.setValue(value.tempUnit);
    });
  }

  updateTempValue() {
    const nextVal =
      this.tempUnitControl.value === tempUnit.C ? tempUnit.F : tempUnit.C;

    this.store.dispatch(setTemperatureUnit({ payload: nextVal }));
  }
}
