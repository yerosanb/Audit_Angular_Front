import { TestBed } from '@angular/core/testing';

import { AtmCardAuditorService } from './atm-card-auditor.service';

describe('AtmCardAuditorService', () => {
  let service: AtmCardAuditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtmCardAuditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
