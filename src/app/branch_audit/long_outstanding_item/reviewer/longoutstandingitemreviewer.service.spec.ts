import { TestBed } from '@angular/core/testing';

import { LongoutstandingitemreviewerService } from './longoutstandingitemreviewer.service';

describe('LongoutstandingitemreviewerService', () => {
  let service: LongoutstandingitemreviewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LongoutstandingitemreviewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
