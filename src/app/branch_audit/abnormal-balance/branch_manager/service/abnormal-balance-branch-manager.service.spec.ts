import { TestBed } from '@angular/core/testing';

import { AbnormalBalanceBranchManagerService } from './abnormal-balance-branch-manager.service';

describe('AbnormalBalanceBranchManagerService', () => {
  let service: AbnormalBalanceBranchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbnormalBalanceBranchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
