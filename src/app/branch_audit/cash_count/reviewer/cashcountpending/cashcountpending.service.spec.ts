import { TestBed } from '@angular/core/testing';

import { CashcountpendingService } from './cashcountpending.service';

describe('CashcountpendingService', () => {
  let service: CashcountpendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashcountpendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
