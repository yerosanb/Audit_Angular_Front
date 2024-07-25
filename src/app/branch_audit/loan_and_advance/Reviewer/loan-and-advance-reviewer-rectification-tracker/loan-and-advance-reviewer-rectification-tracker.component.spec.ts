import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAndAdvanceReviewerRectificationTrackerComponent } from './loan-and-advance-reviewer-rectification-tracker.component';

describe('LoanAndAdvanceReviewerRectificationTrackerComponent', () => {
  let component: LoanAndAdvanceReviewerRectificationTrackerComponent;
  let fixture: ComponentFixture<LoanAndAdvanceReviewerRectificationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAndAdvanceReviewerRectificationTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanAndAdvanceReviewerRectificationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
