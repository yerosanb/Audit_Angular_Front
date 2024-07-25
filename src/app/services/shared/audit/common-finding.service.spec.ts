import { TestBed } from '@angular/core/testing';

import { CommonFindingService } from './common-finding.service';

describe('CommonFindingService', () => {
  let service: CommonFindingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonFindingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
