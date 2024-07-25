import { TestBed } from '@angular/core/testing';

import { AssetLiabilityBranchManagerService } from './asset-liability-branch-manager.service';

describe('AssetLiabilityBranchManagerService', () => {
  let service: AssetLiabilityBranchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetLiabilityBranchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
