import { TestBed } from '@angular/core/testing';

import { LocationsService } from './locations.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'
;
describe('LocationsService', () => {
  let service: LocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
