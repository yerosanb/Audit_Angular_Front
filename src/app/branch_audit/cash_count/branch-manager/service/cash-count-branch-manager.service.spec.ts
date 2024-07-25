import { TestBed } from '@angular/core/testing';

import { CashCountBranchManagerService } from './cash-count-branch-manager.service';

describe('CashCountBranchManagerService', () => {
  let service: CashCountBranchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashCountBranchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
