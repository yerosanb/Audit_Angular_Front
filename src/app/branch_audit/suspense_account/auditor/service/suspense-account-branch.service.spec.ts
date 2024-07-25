import { TestBed } from '@angular/core/testing';

import { SuspenseAccountBranchService } from './suspense-account-branch.service';

describe('SuspenseAccountBranchService', () => {
  let service: SuspenseAccountBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuspenseAccountBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
