import { TestBed } from '@angular/core/testing';

import { FraudCaseService } from './fraud-case.service';

describe('FraudCaseService', () => {
  let service: FraudCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FraudCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
