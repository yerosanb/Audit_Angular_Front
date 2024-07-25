import { TestBed } from '@angular/core/testing';

import { AbnormalBalanceAuditorBranchService } from './abnormal-balance-auditor-branch.service';

describe('AbnormalBalanceAuditorBranchService', () => {
  let service: AbnormalBalanceAuditorBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbnormalBalanceAuditorBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
