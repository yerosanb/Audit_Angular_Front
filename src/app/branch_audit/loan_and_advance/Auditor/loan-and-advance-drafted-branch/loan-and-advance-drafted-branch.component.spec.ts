import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAndAdvanceDraftedBranchComponent } from './loan-and-advance-drafted-branch.component';

describe('LoanAndAdvanceDraftedBranchComponent', () => {
  let component: LoanAndAdvanceDraftedBranchComponent;
  let fixture: ComponentFixture<LoanAndAdvanceDraftedBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAndAdvanceDraftedBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanAndAdvanceDraftedBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
