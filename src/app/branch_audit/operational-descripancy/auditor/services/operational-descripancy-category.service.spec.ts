import { TestBed } from '@angular/core/testing';

import { OperationalDescripancyCategoryService } from './operational-descripancy-category.service';

describe('OperationalDescripancyCategoryService', () => {
  let service: OperationalDescripancyCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationalDescripancyCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
