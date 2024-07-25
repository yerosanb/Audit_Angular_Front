import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAndAdvancePassedBranchComponent } from './loan-and-advance-passed-branch.component';

describe('LoanAndAdvancePassedBranchComponent', () => {
  let component: LoanAndAdvancePassedBranchComponent;
  let fixture: ComponentFixture<LoanAndAdvancePassedBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAndAdvancePassedBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanAndAdvancePassedBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
