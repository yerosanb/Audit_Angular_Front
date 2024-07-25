import { TestBed } from '@angular/core/testing';

import { CashPerformanceAuditorService } from './cash-performance-auditor.service';

describe('CashPerformanceAuditorService', () => {
  let service: CashPerformanceAuditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashPerformanceAuditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
