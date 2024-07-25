import { TestBed } from '@angular/core/testing';

import { OperatioalDescripancyAuditorBranchService } from './operatioal-descripancy-auditor-branch.service';

describe('OperatioalDescripancyAuditorBranchService', () => {
  let service: OperatioalDescripancyAuditorBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperatioalDescripancyAuditorBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
