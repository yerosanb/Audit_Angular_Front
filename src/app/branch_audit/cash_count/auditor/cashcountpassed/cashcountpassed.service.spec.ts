import { TestBed } from '@angular/core/testing';

import { CashcountpassedService } from './cashcountpassed.service';

describe('CashcountpassedService', () => {
  let service: CashcountpassedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashcountpassedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
