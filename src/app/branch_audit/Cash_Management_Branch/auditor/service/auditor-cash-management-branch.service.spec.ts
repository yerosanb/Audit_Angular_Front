import { TestBed } from '@angular/core/testing';

import { AuditorCashManagementBranchService } from './auditor-cash-management-branch.service';

describe('AuditorCashManagementBranchService', () => {
  let service: AuditorCashManagementBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditorCashManagementBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
