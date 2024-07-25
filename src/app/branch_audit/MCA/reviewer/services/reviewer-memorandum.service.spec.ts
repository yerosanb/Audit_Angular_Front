import { TestBed } from '@angular/core/testing';

import { ReviewerMemorandumService } from './reviewer-memorandum.service';

describe('ReviewerMemorandumService', () => {
  let service: ReviewerMemorandumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewerMemorandumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
