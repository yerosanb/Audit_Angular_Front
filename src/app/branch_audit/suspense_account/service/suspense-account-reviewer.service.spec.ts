import { TestBed } from '@angular/core/testing';

import { SuspenseAccountReviewerService } from './suspense-account-reviewer.service';

describe('SuspenseAccountReviewerService', () => {
  let service: SuspenseAccountReviewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuspenseAccountReviewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
