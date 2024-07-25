import { TestBed } from '@angular/core/testing';

import { DormantInactiveAccountReviewerBranchService } from './dormant-inactive-account-reviewer-branch.service';

describe('DormantInactiveAccountReviewerBranchService', () => {
  let service: DormantInactiveAccountReviewerBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DormantInactiveAccountReviewerBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
