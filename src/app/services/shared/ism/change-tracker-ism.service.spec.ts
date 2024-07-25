import { TestBed } from '@angular/core/testing';

import { ChangeTrackerISMService } from './change-tracker-ism.service';

describe('ChangeTrackerISMService', () => {
  let service: ChangeTrackerISMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeTrackerISMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
