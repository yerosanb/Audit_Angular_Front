import { TestBed } from '@angular/core/testing';

import { LoanAndAdvanceAuditorService } from './loan-and-advance-auditor.service';

describe('LoanAndAdvanceAuditorService', () => {
  let service: LoanAndAdvanceAuditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanAndAdvanceAuditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
