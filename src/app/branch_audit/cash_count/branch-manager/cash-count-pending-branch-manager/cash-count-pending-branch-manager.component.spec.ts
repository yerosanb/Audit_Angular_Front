import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCountPendingBranchManagerComponent } from './cash-count-pending-branch-manager.component';

describe('CashCountPendingBranchManagerComponent', () => {
  let component: CashCountPendingBranchManagerComponent;
  let fixture: ComponentFixture<CashCountPendingBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashCountPendingBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashCountPendingBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
