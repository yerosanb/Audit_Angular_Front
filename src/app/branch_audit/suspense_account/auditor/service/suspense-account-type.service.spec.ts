import { TestBed } from '@angular/core/testing';

import { SuspenseAccountTypeService } from './suspense-account-type.service';

describe('SuspenseAccountTypeService', () => {
  let service: SuspenseAccountTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuspenseAccountTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
