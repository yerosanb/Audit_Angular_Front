import { TestBed } from '@angular/core/testing';

import { LoanAndAndAdvanceBranchManagerService } from './loan-and-and-advance-branch-manager.service';

describe('LoanAndAndAdvanceBranchManagerService', () => {
  let service: LoanAndAndAdvanceBranchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanAndAndAdvanceBranchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
