import { TestBed } from '@angular/core/testing';

import { RemarkBranchAuditService } from './remark-branch-audit.service';

describe('RemarkBranchAuditService', () => {
  let service: RemarkBranchAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemarkBranchAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
