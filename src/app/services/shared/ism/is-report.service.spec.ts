import { TestBed } from '@angular/core/testing';

import { ISReportService } from './is-report.service';

describe('ISReportService', () => {
  let service: ISReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ISReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
