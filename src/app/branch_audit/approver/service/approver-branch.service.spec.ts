import { TestBed } from '@angular/core/testing';

import { ApproverBranchService } from './approver-branch.service';

describe('ApproverBranchService', () => {
  let service: ApproverBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproverBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
