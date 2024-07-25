import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongOutstandingReviewerRectificationTrackerComponent } from './long-outstanding-reviewer-rectification-tracker.component';

describe('LongOutstandingReviewerRectificationTrackerComponent', () => {
  let component: LongOutstandingReviewerRectificationTrackerComponent;
  let fixture: ComponentFixture<LongOutstandingReviewerRectificationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongOutstandingReviewerRectificationTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongOutstandingReviewerRectificationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
