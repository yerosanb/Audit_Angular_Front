import { TestBed } from '@angular/core/testing';

import { DataPoolingServiceBranchService } from './data-pooling-service-branch.service';

describe('DataPoolingServiceBranchService', () => {
  let service: DataPoolingServiceBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPoolingServiceBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
