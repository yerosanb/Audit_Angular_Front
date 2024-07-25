import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalDescripancyReviewerRectificationTrackerComponent } from './operational-descripancy-reviewer-rectification-tracker.component';

describe('OperationalDescripancyReviewerRectificationTrackerComponent', () => {
  let component: OperationalDescripancyReviewerRectificationTrackerComponent;
  let fixture: ComponentFixture<OperationalDescripancyReviewerRectificationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalDescripancyReviewerRectificationTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalDescripancyReviewerRectificationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
