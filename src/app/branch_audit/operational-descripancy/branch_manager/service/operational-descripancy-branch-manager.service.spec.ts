import { TestBed } from '@angular/core/testing';

import { OperationalDescripancyBranchManagerService } from './operational-descripancy-branch-manager.service';

describe('OperationalDescripancyBranchManagerService', () => {
  let service: OperationalDescripancyBranchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationalDescripancyBranchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
