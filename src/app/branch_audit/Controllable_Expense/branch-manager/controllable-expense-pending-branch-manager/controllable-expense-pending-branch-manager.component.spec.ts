import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllableExpensePendingBranchManagerComponent } from './controllable-expense-pending-branch-manager.component';

describe('ControllableExpensePendingBranchManagerComponent', () => {
  let component: ControllableExpensePendingBranchManagerComponent;
  let fixture: ComponentFixture<ControllableExpensePendingBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllableExpensePendingBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllableExpensePendingBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
