import { TestBed } from '@angular/core/testing';

import { IncompleteAccountReviewerBranchService } from './incomplete-account-reviewer-branch.service';

describe('IncompleteAccountReviewerBranchService', () => {
  let service: IncompleteAccountReviewerBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncompleteAccountReviewerBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
