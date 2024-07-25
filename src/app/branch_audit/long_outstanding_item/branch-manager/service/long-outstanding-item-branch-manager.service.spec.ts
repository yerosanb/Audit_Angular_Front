import { TestBed } from '@angular/core/testing';

import { LongOutstandingItemBranchManagerService } from './long-outstanding-item-branch-manager.service';

describe('LongOutstandingItemBranchManagerService', () => {
  let service: LongOutstandingItemBranchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LongOutstandingItemBranchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
