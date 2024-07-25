import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashManagementPendingBranchManagerComponent } from './cash-management-pending-branch-manager.component';

describe('CashManagementPendingBranchManagerComponent', () => {
  let component: CashManagementPendingBranchManagerComponent;
  let fixture: ComponentFixture<CashManagementPendingBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashManagementPendingBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashManagementPendingBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
