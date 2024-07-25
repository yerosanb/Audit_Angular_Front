import { TestBed } from '@angular/core/testing';

import { RegionalCompilerService } from './regional-compiler.service';

describe('RegionalCompilerService', () => {
  let service: RegionalCompilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionalCompilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
