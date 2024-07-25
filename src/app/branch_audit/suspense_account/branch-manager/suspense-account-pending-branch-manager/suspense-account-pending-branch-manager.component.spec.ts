import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenseAccountPendingBranchManagerComponent } from './suspense-account-pending-branch-manager.component';

describe('SuspenseAccountPendingBranchManagerComponent', () => {
  let component: SuspenseAccountPendingBranchManagerComponent;
  let fixture: ComponentFixture<SuspenseAccountPendingBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspenseAccountPendingBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspenseAccountPendingBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
