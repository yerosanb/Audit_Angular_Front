import { TestBed } from '@angular/core/testing';

import { RemarkCompiledBranchAuditService } from './remark-compiled-branch-audit.service';

describe('RemarkCompiledBranchAuditService', () => {
  let service: RemarkCompiledBranchAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemarkCompiledBranchAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
