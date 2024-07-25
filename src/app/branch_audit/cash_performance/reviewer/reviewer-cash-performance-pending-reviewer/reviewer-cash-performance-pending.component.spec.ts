import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerCashPerformancePendingComponent } from './reviewer-cash-performance-pending.component';

describe('ReviewerCashPerformancePendingComponent', () => {
  let component: ReviewerCashPerformancePendingComponent;
  let fixture: ComponentFixture<ReviewerCashPerformancePendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewerCashPerformancePendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewerCashPerformancePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
