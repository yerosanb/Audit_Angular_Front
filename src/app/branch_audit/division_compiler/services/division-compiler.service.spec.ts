import { TestBed } from '@angular/core/testing';

import { DivisionCompilerService } from './division-compiler.service';

describe('DivisionCompilerService', () => {
  let service: DivisionCompilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivisionCompilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
