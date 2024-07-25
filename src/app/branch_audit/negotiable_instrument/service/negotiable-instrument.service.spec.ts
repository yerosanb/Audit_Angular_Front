import { TestBed } from '@angular/core/testing';

import { NegotiableInstrumentService } from './negotiable-instrument.service';

describe('NegotiableInstrumentService', () => {
  let service: NegotiableInstrumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NegotiableInstrumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
