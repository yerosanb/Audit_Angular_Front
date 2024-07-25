import { TestBed } from '@angular/core/testing';

import { RoleFunctionalityService } from './role-functionality.service';

describe('RoleFunctionalityService', () => {
  let service: RoleFunctionalityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleFunctionalityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
