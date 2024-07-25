import { TestBed } from '@angular/core/testing';

import { CommonReviewerBranchFinancialService } from './common-reviewer-branch-financial.service';

describe('CommonReviewerBranchFinancialService', () => {
  let service: CommonReviewerBranchFinancialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonReviewerBranchFinancialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
