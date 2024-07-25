import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchAuditNotificationLowerRolesComponent } from './branch-audit-notification-lower-roles.component';

describe('BranchAuditNotificationLowerRolesComponent', () => {
  let component: BranchAuditNotificationLowerRolesComponent;
  let fixture: ComponentFixture<BranchAuditNotificationLowerRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchAuditNotificationLowerRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchAuditNotificationLowerRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
