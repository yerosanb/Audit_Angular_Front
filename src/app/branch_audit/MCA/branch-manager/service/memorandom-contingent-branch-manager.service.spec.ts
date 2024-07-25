import { TestBed } from '@angular/core/testing';

import { MemorandomContingentBranchManagerService } from './memorandom-contingent-branch-manager.service';

describe('MemorandomContingentBranchManagerService', () => {
  let service: MemorandomContingentBranchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemorandomContingentBranchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
