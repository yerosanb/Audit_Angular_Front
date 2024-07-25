import { TestBed } from '@angular/core/testing';

import { ControllableReviewerService } from './controllable-reviewer.service';

describe('ControllableReviewerService', () => {
  let service: ControllableReviewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControllableReviewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
