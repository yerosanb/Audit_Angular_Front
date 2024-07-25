import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchAuditNotificationHigherRolesComponent } from './branch-audit-notification-higher-roles.component';

describe('BranchAuditNotificationHigherRolesComponent', () => {
  let component: BranchAuditNotificationHigherRolesComponent;
  let fixture: ComponentFixture<BranchAuditNotificationHigherRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchAuditNotificationHigherRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchAuditNotificationHigherRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
