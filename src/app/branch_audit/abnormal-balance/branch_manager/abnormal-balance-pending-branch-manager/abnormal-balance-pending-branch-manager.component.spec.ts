import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbnormalBalancePendingBranchManagerComponent } from './abnormal-balance-pending-branch-manager.component';

describe('AbnormalBalancePendingBranchManagerComponent', () => {
  let component: AbnormalBalancePendingBranchManagerComponent;
  let fixture: ComponentFixture<AbnormalBalancePendingBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbnormalBalancePendingBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbnormalBalancePendingBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
