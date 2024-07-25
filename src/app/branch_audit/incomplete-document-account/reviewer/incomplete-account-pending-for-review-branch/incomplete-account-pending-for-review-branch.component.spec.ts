import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteAccountPendingForReviewBranchComponent } from './incomplete-account-pending-for-review-branch.component';

describe('IncompleteAccountPendingForReviewBranchComponent', () => {
  let component: IncompleteAccountPendingForReviewBranchComponent;
  let fixture: ComponentFixture<IncompleteAccountPendingForReviewBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncompleteAccountPendingForReviewBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncompleteAccountPendingForReviewBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
