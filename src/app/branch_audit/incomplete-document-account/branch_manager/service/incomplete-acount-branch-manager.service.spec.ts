import { TestBed } from '@angular/core/testing';

import { IncompleteAcountBranchManagerService } from './incomplete-acount-branch-manager.service';

describe('IncompleteAcountBranchManagerService', () => {
  let service: IncompleteAcountBranchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncompleteAcountBranchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
