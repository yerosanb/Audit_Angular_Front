import { TestBed } from '@angular/core/testing';

import { RoleRightService } from './role-right.service';

describe('RoleRightService', () => {
  let service: RoleRightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleRightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
