import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbnormalBalanceReviewedBranchComponent } from './abnormal-balance-reviewed-branch.component';

describe('AbnormalBalanceReviewedBranchComponent', () => {
  let component: AbnormalBalanceReviewedBranchComponent;
  let fixture: ComponentFixture<AbnormalBalanceReviewedBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbnormalBalanceReviewedBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbnormalBalanceReviewedBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
