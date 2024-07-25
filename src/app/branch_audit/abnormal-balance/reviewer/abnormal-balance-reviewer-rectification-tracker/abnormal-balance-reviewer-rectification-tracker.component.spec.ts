import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbnormalBalanceReviewerRectificationTrackerComponent } from './abnormal-balance-reviewer-rectification-tracker.component';

describe('AbnormalBalanceReviewerRectificationTrackerComponent', () => {
  let component: AbnormalBalanceReviewerRectificationTrackerComponent;
  let fixture: ComponentFixture<AbnormalBalanceReviewerRectificationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbnormalBalanceReviewerRectificationTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbnormalBalanceReviewerRectificationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
