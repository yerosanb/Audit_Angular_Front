import { TestBed } from '@angular/core/testing';

import { DivisionCompilerForCompilingService } from './division-compiler-for-compiling.service';

describe('DivisionCompilerForCompilingService', () => {
  let service: DivisionCompilerForCompilingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivisionCompilerForCompilingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
