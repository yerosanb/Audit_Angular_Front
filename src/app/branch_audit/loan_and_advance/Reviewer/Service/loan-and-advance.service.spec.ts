import { TestBed } from '@angular/core/testing';

import { LoanAndAdvanceService } from './loan-and-advance.service';

describe('LoanAndAdvanceService', () => {
  let service: LoanAndAdvanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanAndAdvanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
