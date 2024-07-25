import { TestBed } from '@angular/core/testing';

import { MgtReportService } from './mgt-report.service';

describe('MgtReportService', () => {
  let service: MgtReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MgtReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
