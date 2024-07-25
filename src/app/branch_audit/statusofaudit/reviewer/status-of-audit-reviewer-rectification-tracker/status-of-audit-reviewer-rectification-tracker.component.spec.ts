import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusOfAuditReviewerRectificationTrackerComponent } from './status-of-audit-reviewer-rectification-tracker.component';

describe('StatusOfAuditReviewerRectificationTrackerComponent', () => {
  let component: StatusOfAuditReviewerRectificationTrackerComponent;
  let fixture: ComponentFixture<StatusOfAuditReviewerRectificationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusOfAuditReviewerRectificationTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusOfAuditReviewerRectificationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
