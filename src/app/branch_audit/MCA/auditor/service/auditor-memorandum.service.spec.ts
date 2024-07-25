import { TestBed } from '@angular/core/testing';

import { AuditorMemorandumService } from './auditor-memorandum.service';

describe('AuditorMemorandumService', () => {
  let service: AuditorMemorandumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditorMemorandumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
