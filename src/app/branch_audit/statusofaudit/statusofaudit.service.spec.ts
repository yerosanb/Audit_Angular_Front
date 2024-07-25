import { TestBed } from '@angular/core/testing';

import { StatusofauditService } from './statusofaudit.service';

describe('StatusofauditService', () => {
  let service: StatusofauditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusofauditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
