import { TestBed } from '@angular/core/testing';

import { OperationalDescripancyRegionalCompilerService } from './operational-descripancy-regional-compiler.service';

describe('OperationalDescripancyRegionalCompilerService', () => {
  let service: OperationalDescripancyRegionalCompilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationalDescripancyRegionalCompilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
