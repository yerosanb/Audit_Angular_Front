import { TestBed } from '@angular/core/testing';

import { BranchAuditNotificationServiceService } from './branch-audit-notification-service.service';

describe('BranchAuditNotificationServiceService', () => {
  let service: BranchAuditNotificationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchAuditNotificationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
