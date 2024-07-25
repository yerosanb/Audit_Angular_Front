import { TestBed } from '@angular/core/testing';

import { AtmCardBranchManagerService } from './atm-card-branch-manager.service';

describe('AtmCardBranchManagerService', () => {
  let service: AtmCardBranchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtmCardBranchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
