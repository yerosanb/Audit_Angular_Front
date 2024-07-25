import { TestBed } from '@angular/core/testing';

import { IncompleteAccountAuditorBranchService } from './incomplete-account-auditor-branch.service';

describe('IncompleteAccountAuditorBranchService', () => {
  let service: IncompleteAccountAuditorBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncompleteAccountAuditorBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
