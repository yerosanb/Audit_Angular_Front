import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashManagementCreateEditBranchComponent } from './cash-management-create-edit-branch.component';

describe('CashManagementCreateEditBranchComponent', () => {
  let component: CashManagementCreateEditBranchComponent;
  let fixture: ComponentFixture<CashManagementCreateEditBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashManagementCreateEditBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashManagementCreateEditBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
