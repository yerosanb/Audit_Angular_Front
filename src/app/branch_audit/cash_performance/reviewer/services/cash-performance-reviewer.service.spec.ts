import { TestBed } from '@angular/core/testing';

import { CashPerformanceReviewerService } from './cash-performance-reviewer.service';

describe('CashPerformanceReviewerService', () => {
  let service: CashPerformanceReviewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashPerformanceReviewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
