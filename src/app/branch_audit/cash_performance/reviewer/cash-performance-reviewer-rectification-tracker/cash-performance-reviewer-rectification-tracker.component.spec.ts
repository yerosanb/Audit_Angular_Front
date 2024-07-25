import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashPerformanceReviewerRectificationTrackerComponent } from './cash-performance-reviewer-rectification-tracker.component';

describe('CashPerformanceReviewerRectificationTrackerComponent', () => {
  let component: CashPerformanceReviewerRectificationTrackerComponent;
  let fixture: ComponentFixture<CashPerformanceReviewerRectificationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashPerformanceReviewerRectificationTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashPerformanceReviewerRectificationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
