import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmCardReviewerRectificationTrackerComponent } from './atm-card-reviewer-rectification-tracker.component';

describe('AtmCardReviewerRectificationTrackerComponent', () => {
  let component: AtmCardReviewerRectificationTrackerComponent;
  let fixture: ComponentFixture<AtmCardReviewerRectificationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtmCardReviewerRectificationTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtmCardReviewerRectificationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
