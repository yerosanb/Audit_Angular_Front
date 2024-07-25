import { TestBed } from '@angular/core/testing';

import { CashManagementBranchManagerService } from './cash-management-branch-manager.service';

describe('CashManagementBranchManagerService', () => {
  let service: CashManagementBranchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashManagementBranchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
