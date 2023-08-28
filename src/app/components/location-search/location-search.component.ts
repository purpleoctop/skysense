import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  SecurityContext,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { LocationsService } from '../../services/locations/locations.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, FormsModule],
  providers: [LocationsService],
})
export class LocationSearchComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private locationsService: LocationsService,
    private sanitizer: DomSanitizer
  ) {}
  locationsForm!: FormGroup;
  citiesList!: string[];
  suggestions!: string[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Output() locationConfirm = new EventEmitter<string>();

  ngOnInit(): void {
    this.locationsForm = this.fb.group({ city: [''] });

    this.locationsForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.suggestions = this.findSuggestions(value.city);
      });

    this.locationsService
      .getAllCities()
      .pipe(takeUntil(this.destroy$))
      .subscribe((cities) => (this.citiesList = cities));
  }

  onSubmit(city?: string): void {
    if (city) {
      this.locationsForm.setValue({ city });
    }
    const sanitizedValue = this.sanitizeInput(this.locationsForm.value.city)??'';
    this.locationConfirm.emit(sanitizedValue);

    this.suggestions = [];
  }

  sanitizeInput(inputValue: string) {
    return this.sanitizer.sanitize(SecurityContext.HTML, inputValue);
  }

  private searchInCities(searchKey: string, list: string[]): string[] {
    if (list?.length > 0)
      return list.filter((item) =>
        item.toLocaleLowerCase().startsWith(searchKey.toLocaleLowerCase())
      );
    return [];
  }

  private findSuggestions(city: string): string[] {
    if (city.length === 3) {
      return this.searchInCities(city, this.citiesList);
    } else if (city.length > 3) {
      return this.searchInCities(city, this.suggestions);
    }
    return [];
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
