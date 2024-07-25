import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllableExpenseReviewerRectificationTrackerComponent } from './controllable-expense-reviewer-rectification-tracker.component';

describe('ControllableExpenseReviewerRectificationTrackerComponent', () => {
  let component: ControllableExpenseReviewerRectificationTrackerComponent;
  let fixture: ComponentFixture<ControllableExpenseReviewerRectificationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllableExpenseReviewerRectificationTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllableExpenseReviewerRectificationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
