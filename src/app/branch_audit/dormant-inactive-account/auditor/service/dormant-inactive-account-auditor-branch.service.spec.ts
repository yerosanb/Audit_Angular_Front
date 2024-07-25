import { TestBed } from '@angular/core/testing';

import { DormantInactiveAccountAuditorBranchService } from './dormant-inactive-account-auditor-branch.service';

describe('DormantInactiveAccountAuditorBranchService', () => {
  let service: DormantInactiveAccountAuditorBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DormantInactiveAccountAuditorBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
