import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbnormalBalancePassedBranchComponent } from './abnormal-balance-passed-branch.component';

describe('AbnormalBalancePassedBranchComponent', () => {
  let component: AbnormalBalancePassedBranchComponent;
  let fixture: ComponentFixture<AbnormalBalancePassedBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbnormalBalancePassedBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbnormalBalancePassedBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
