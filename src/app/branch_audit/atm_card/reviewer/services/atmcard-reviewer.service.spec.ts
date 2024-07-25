import { TestBed } from '@angular/core/testing';

import { ATMCardReviewerService } from './atmcard-reviewer.service';

describe('ATMCardReviewerService', () => {
  let service: ATMCardReviewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ATMCardReviewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
