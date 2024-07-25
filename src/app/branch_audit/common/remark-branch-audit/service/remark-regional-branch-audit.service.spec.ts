import { TestBed } from '@angular/core/testing';

import { RemarkRegionalBranchAuditService } from './remark-regional-branch-audit.service';

describe('RemarkRegionalBranchAuditService', () => {
  let service: RemarkRegionalBranchAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemarkRegionalBranchAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
