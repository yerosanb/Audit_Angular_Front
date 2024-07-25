import { TestBed } from '@angular/core/testing';

import { RectificationTrackerService } from './rectification-tracker.service';

describe('RectificationTrackerService', () => {
  let service: RectificationTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RectificationTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
