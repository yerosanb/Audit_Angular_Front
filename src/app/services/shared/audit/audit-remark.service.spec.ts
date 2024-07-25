import { TestBed } from '@angular/core/testing';

import { AuditRemarkService } from './audit-remark.service';

describe('AuditRemarkService', () => {
  let service: AuditRemarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditRemarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
