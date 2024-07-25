import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAndAdvancePendingBranchManagerComponent } from './loan-and-advance-pending-branch-manager.component';

describe('LoanAndAdvancePendingBranchManagerComponent', () => {
  let component: LoanAndAdvancePendingBranchManagerComponent;
  let fixture: ComponentFixture<LoanAndAdvancePendingBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAndAdvancePendingBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanAndAdvancePendingBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
