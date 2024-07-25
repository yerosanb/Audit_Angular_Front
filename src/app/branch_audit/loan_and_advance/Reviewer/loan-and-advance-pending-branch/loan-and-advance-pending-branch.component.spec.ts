import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAndAdvancePendingBranchComponent } from './loan-and-advance-pending-branch.component';

describe('LoanAndAdvancePendingBranchComponent', () => {
  let component: LoanAndAdvancePendingBranchComponent;
  let fixture: ComponentFixture<LoanAndAdvancePendingBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAndAdvancePendingBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanAndAdvancePendingBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
