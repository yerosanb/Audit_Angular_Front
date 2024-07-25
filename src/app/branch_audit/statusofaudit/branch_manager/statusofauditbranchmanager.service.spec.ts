import { TestBed } from '@angular/core/testing';

import { StatusofauditbranchmanagerService } from './statusofauditbranchmanager.service';

describe('StatusofauditbranchmanagerService', () => {
  let service: StatusofauditbranchmanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusofauditbranchmanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
