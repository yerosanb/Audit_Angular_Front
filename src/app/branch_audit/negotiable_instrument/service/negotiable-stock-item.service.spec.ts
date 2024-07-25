import { TestBed } from '@angular/core/testing';

import { NegotiableStockItemService } from './negotiable-stock-item.service';

describe('NegotiableStockItemService', () => {
  let service: NegotiableStockItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NegotiableStockItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
