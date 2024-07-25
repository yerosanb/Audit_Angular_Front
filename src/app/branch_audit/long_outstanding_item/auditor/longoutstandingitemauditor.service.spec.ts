import { TestBed } from '@angular/core/testing';

import { LongoutstandingitemauditorService } from './longoutstandingitemauditor.service';

describe('LongoutstandingitemauditorService', () => {
  let service: LongoutstandingitemauditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LongoutstandingitemauditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
