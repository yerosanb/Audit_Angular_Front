import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashPerformancePendingBranchManagerComponent } from './cash-performance-pending-branch-manager.component';

describe('CashPerformancePendingBranchManagerComponent', () => {
  let component: CashPerformancePendingBranchManagerComponent;
  let fixture: ComponentFixture<CashPerformancePendingBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashPerformancePendingBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashPerformancePendingBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
