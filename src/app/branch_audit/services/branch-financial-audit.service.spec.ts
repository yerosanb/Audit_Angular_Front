import { TestBed } from '@angular/core/testing';

import { BranchFinancialAuditService } from './branch-financial-audit.service';

describe('BranchFinancialAuditService', () => {
  let service: BranchFinancialAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchFinancialAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
