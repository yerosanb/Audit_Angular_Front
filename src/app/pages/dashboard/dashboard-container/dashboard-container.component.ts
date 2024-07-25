import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/admin/user.service';
import { StorageService } from 'app/services/shared/storage.service';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css'],
})
export class DashboardContainerComponent implements OnInit {
  isLoggedIn = false;
  isDetailVisible = false;
  private roles: string[] = [];
  admin = false;
  approver = false;
  followup_officer = false;
  reviewer = false;
  auditee = false;
  auditee_division = false;
  auditor = false;
  compiler = false;
  higher_official= false;
  branch_m= false;
  regional_d= false;
  constructor(
    private storageService: StorageService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.admin = this.roles.includes('ROLE_ADMIN');
      this.approver = this.roles.includes('ROLE_APPROVER_BFA');
      this.reviewer = this.roles.includes('ROLE_REVIEWER_BFA');
      this.followup_officer = this.roles.includes('ROLE_FOLLOWUP_OFFICER');
      this.auditor = this.roles.includes('ROLE_AUDITOR_BFA');
      this.auditee = this.roles.includes('ROLE_AUDITEE');
      this.auditee_division = this.roles.includes('ROLE_AUDITEE_DIVISION');
      this.compiler = this.roles.includes('ROLE_COMPILER_BFA');
      this.higher_official = this.roles.includes('ROLE_HIGHER_OFFICIAL');
      this.branch_m = this.roles.includes('ROLE_BRANCHM_BFA');
      this.regional_d = this.roles.includes('ROLE_REGIONALD_BFA');
    }
  }
  toggleDetailVisibility() {
    this.isDetailVisible = !this.isDetailVisible;
  }
}
