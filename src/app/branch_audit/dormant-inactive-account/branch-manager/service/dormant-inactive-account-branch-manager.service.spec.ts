import { TestBed } from '@angular/core/testing';

import { DormantInactiveAccountBranchManagerService } from './dormant-inactive-account-branch-manager.service';

describe('DormantInactiveAccountBranchManagerService', () => {
  let service: DormantInactiveAccountBranchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DormantInactiveAccountBranchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
