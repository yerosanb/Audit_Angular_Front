import { TestBed } from '@angular/core/testing';

import { AssetLiabilityAuditorBranchService } from './asset-liability-auditor-branch.service';

describe('AssetLiabilityAuditorBranchService', () => {
  let service: AssetLiabilityAuditorBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetLiabilityAuditorBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
