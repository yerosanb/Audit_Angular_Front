import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerCashManagementPendingComponent } from './reviewer-cash-management-pending.component';

describe('ReviewerCashManagementPendingComponent', () => {
  let component: ReviewerCashManagementPendingComponent;
  let fixture: ComponentFixture<ReviewerCashManagementPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewerCashManagementPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewerCashManagementPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
