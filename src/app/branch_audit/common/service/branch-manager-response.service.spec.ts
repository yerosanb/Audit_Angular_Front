import { TestBed } from '@angular/core/testing';

import { BranchManagerResponseService } from './branch-manager-response.service';

describe('BranchManagerResponseService', () => {
  let service: BranchManagerResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchManagerResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
