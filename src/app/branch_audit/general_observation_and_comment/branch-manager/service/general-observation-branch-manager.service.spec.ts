import { TestBed } from '@angular/core/testing';

import { GeneralObservationBranchManagerService } from './general-observation-branch-manager.service';

describe('GeneralObservationBranchManagerService', () => {
  let service: GeneralObservationBranchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralObservationBranchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
