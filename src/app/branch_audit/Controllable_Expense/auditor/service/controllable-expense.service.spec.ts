import { TestBed } from '@angular/core/testing';

import { ControllableExpenseService } from './controllable-expense.service';

describe('ControllableExpenseService', () => {
  let service: ControllableExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControllableExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
