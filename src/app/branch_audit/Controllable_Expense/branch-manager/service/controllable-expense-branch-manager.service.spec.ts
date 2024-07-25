import { TestBed } from '@angular/core/testing';

import { ControllableExpenseBranchManagerService } from './controllable-expense-branch-manager.service';

describe('ControllableExpenseBranchManagerService', () => {
  let service: ControllableExpenseBranchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControllableExpenseBranchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
