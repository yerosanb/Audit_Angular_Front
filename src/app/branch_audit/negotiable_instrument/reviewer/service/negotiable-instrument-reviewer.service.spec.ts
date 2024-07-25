import { TestBed } from '@angular/core/testing';

import { NegotiableInstrumentReviewerService } from './negotiable-instrument-reviewer.service';

describe('NegotiableInstrumentReviewerService', () => {
  let service: NegotiableInstrumentReviewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NegotiableInstrumentReviewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
