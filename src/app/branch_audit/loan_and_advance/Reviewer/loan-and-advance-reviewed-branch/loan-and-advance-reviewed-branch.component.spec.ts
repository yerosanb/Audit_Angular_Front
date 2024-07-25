import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAndAdvanceReviewedBranchComponent } from './loan-and-advance-reviewed-branch.component';

describe('LoanAndAdvanceReviewedBranchComponent', () => {
  let component: LoanAndAdvanceReviewedBranchComponent;
  let fixture: ComponentFixture<LoanAndAdvanceReviewedBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAndAdvanceReviewedBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanAndAdvanceReviewedBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
