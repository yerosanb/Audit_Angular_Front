import { TestBed } from '@angular/core/testing';

import { CashManagementBranchService } from './cash-management-branch.service';

describe('CashManagementBranchService', () => {
  let service: CashManagementBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashManagementBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
