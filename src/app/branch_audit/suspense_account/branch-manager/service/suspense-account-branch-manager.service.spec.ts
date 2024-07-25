import { TestBed } from '@angular/core/testing';

import { SuspenseAccountBranchManagerService } from './suspense-account-branch-manager.service';

describe('SuspenseAccountBranchManagerService', () => {
  let service: SuspenseAccountBranchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuspenseAccountBranchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
