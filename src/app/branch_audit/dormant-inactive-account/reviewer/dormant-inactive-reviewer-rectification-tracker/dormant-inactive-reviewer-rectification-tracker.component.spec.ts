import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormantInactiveReviewerRectificationTrackerComponent } from './dormant-inactive-reviewer-rectification-tracker.component';

describe('DormantInactiveReviewerRectificationTrackerComponent', () => {
  let component: DormantInactiveReviewerRectificationTrackerComponent;
  let fixture: ComponentFixture<DormantInactiveReviewerRectificationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormantInactiveReviewerRectificationTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DormantInactiveReviewerRectificationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
