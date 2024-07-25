import { TestBed } from '@angular/core/testing';

import { GeneralObservationReviewerService } from './general-observation-reviewer.service';

describe('GeneralObservationReviewerService', () => {
  let service: GeneralObservationReviewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralObservationReviewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
