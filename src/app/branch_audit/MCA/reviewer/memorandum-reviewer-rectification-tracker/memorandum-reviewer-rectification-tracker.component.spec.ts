import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorandumReviewerRectificationTrackerComponent } from './memorandum-reviewer-rectification-tracker.component';

describe('MemorandumReviewerRectificationTrackerComponent', () => {
  let component: MemorandumReviewerRectificationTrackerComponent;
  let fixture: ComponentFixture<MemorandumReviewerRectificationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemorandumReviewerRectificationTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemorandumReviewerRectificationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
