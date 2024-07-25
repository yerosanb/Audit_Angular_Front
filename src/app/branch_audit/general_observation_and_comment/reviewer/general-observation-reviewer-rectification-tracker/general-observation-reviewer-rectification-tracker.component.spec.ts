import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralObservationReviewerRectificationTrackerComponent } from './general-observation-reviewer-rectification-tracker.component';

describe('GeneralObservationReviewerRectificationTrackerComponent', () => {
  let component: GeneralObservationReviewerRectificationTrackerComponent;
  let fixture: ComponentFixture<GeneralObservationReviewerRectificationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralObservationReviewerRectificationTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralObservationReviewerRectificationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
