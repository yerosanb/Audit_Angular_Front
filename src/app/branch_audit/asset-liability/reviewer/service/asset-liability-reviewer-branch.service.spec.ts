import { TestBed } from '@angular/core/testing';

import { AssetLiabilityReviewerBranchService } from './asset-liability-reviewer-branch.service';

describe('AssetLiabilityReviewerBranchService', () => {
  let service: AssetLiabilityReviewerBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetLiabilityReviewerBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
