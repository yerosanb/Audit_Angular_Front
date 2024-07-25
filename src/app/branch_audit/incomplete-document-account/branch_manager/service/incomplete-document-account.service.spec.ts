import { TestBed } from '@angular/core/testing';

import { IncompleteDocumentAccountService } from './incomplete-document-account.service';

describe('IncompleteDocumentAccountService', () => {
  let service: IncompleteDocumentAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncompleteDocumentAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
