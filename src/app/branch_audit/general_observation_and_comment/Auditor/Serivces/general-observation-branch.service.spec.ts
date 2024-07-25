import { TestBed } from '@angular/core/testing';

import { GeneralObservationBranchService } from './general-observation-branch.service';

describe('GeneralObservationBranchService', () => {
  let service: GeneralObservationBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralObservationBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
