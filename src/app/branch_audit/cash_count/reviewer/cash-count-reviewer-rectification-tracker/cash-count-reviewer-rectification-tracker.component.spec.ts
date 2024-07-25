import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCountReviewerRectificationTrackerComponent } from './cash-count-reviewer-rectification-tracker.component';

describe('CashCountReviewerRectificationTrackerComponent', () => {
  let component: CashCountReviewerRectificationTrackerComponent;
  let fixture: ComponentFixture<CashCountReviewerRectificationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashCountReviewerRectificationTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashCountReviewerRectificationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
