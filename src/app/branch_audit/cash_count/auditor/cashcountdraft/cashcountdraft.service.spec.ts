import { TestBed } from '@angular/core/testing';

import { CashcountdraftService } from './cashcountdraft.service';

describe('CashcountdraftService', () => {
  let service: CashcountdraftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashcountdraftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
