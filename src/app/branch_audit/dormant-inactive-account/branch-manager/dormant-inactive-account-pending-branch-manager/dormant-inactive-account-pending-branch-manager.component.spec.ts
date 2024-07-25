import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormantInactiveAccountPendingBranchManagerComponent } from './dormant-inactive-account-pending-branch-manager.component';

describe('DormantInactiveAccountPendingBranchManagerComponent', () => {
  let component: DormantInactiveAccountPendingBranchManagerComponent;
  let fixture: ComponentFixture<DormantInactiveAccountPendingBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormantInactiveAccountPendingBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DormantInactiveAccountPendingBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
