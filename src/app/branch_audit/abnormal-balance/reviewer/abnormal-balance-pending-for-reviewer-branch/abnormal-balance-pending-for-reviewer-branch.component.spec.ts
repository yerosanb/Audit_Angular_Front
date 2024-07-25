import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbnormalBalancePendingForReviewerBranchComponent } from './abnormal-balance-pending-for-reviewer-branch.component';

describe('AbnormalBalancePendingForReviewerBranchComponent', () => {
  let component: AbnormalBalancePendingForReviewerBranchComponent;
  let fixture: ComponentFixture<AbnormalBalancePendingForReviewerBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbnormalBalancePendingForReviewerBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbnormalBalancePendingForReviewerBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
