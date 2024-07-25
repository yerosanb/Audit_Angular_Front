import { TestBed } from '@angular/core/testing';

import { CashcountreviewedService } from './cashcountreviewed.service';

describe('CashcountreviewedService', () => {
  let service: CashcountreviewedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashcountreviewedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
