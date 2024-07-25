import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerCashPerformanceReviewedComponent } from './reviewer-cash-performance-reviewed.component';

describe('ReviewerCashPerformanceReviewedComponent', () => {
  let component: ReviewerCashPerformanceReviewedComponent;
  let fixture: ComponentFixture<ReviewerCashPerformanceReviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewerCashPerformanceReviewedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewerCashPerformanceReviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
