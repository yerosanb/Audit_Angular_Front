import { TestBed } from '@angular/core/testing';

import { CashPerformanceBranchManagerService } from './cash-performance-branch-manager.service';

describe('CashPerformanceBranchManagerService', () => {
  let service: CashPerformanceBranchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashPerformanceBranchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
