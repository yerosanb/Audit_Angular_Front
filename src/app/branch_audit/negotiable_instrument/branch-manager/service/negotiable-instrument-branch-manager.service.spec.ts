import { TestBed } from '@angular/core/testing';

import { NegotiableInstrumentBranchManagerService } from './negotiable-instrument-branch-manager.service';

describe('NegotiableInstrumentBranchManagerService', () => {
  let service: NegotiableInstrumentBranchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NegotiableInstrumentBranchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
