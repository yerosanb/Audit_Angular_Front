import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormantInactiveAccountPendingForReviewBranchComponent } from './dormant-inactive-account-pending-for-review-branch.component';

describe('DormantInactiveAccountPendingForReviewBranchComponent', () => {
  let component: DormantInactiveAccountPendingForReviewBranchComponent;
  let fixture: ComponentFixture<DormantInactiveAccountPendingForReviewBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormantInactiveAccountPendingForReviewBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DormantInactiveAccountPendingForReviewBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
