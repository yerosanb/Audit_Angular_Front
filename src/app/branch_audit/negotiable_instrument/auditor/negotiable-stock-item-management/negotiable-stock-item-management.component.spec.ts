import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotiableStockItemManagementComponent } from './negotiable-stock-item-management.component';

describe('NegotiableStockItemManagementComponent', () => {
  let component: NegotiableStockItemManagementComponent;
  let fixture: ComponentFixture<NegotiableStockItemManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegotiableStockItemManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegotiableStockItemManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
