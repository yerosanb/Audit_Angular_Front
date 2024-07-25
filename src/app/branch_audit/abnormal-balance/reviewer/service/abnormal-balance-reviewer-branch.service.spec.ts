import { TestBed } from '@angular/core/testing';

import { AbnormalBalanceReviewerBranchService } from './abnormal-balance-reviewer-branch.service';

describe('AbnormalBalanceReviewerBranchService', () => {
  let service: AbnormalBalanceReviewerBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbnormalBalanceReviewerBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
