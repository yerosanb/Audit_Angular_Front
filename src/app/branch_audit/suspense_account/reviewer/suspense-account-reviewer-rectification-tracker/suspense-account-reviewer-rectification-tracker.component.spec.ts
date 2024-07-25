import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenseAccountReviewerRectificationTrackerComponent } from './suspense-account-reviewer-rectification-tracker.component';

describe('SuspenseAccountReviewerRectificationTrackerComponent', () => {
  let component: SuspenseAccountReviewerRectificationTrackerComponent;
  let fixture: ComponentFixture<SuspenseAccountReviewerRectificationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspenseAccountReviewerRectificationTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspenseAccountReviewerRectificationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
