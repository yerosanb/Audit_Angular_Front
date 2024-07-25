import { TestBed } from '@angular/core/testing';

import { MaxFailedAndJwtControlService } from './max-failed-and-jwt-control.service';

describe('MaxFailedAndJwtControlService', () => {
  let service: MaxFailedAndJwtControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaxFailedAndJwtControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
