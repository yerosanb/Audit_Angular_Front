import { TestBed } from '@angular/core/testing';

import { BranchReportService } from './branch-report.service';

describe('BranchReportService', () => {
  let service: BranchReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
