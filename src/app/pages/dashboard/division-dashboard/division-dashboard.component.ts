import { Component } from '@angular/core';

import { StorageService } from 'app/services/shared/storage.service';
//import { MessageService } from 'primeng/api/messageservice';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardService } from '../branch-dashboard-general/services/dashboard.service';
//import {MenuItem} from 'primeng/api';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-division-dashboard',
  templateUrl: './division-dashboard.component.html',
  styleUrls: ['./division-dashboard.component.css'],
})
export class DivisionDashboardComponent {
  isLoggedIn = false;
  loading = false;

  dashboard_response_data: any;

  private roles: string[] = [];
  admin = false;
  approver = false;
  followup_officer = false;
  reviewer = false;
  auditee = false;
  auditee_division = false;
  auditor = false;
  compiler = false;

  c_1: boolean = false;
  c_2: boolean = false;
  c_3: boolean = false;
  c_4: boolean = false;
  c_5: boolean = false;
  a_: boolean = true;
  constructor(
    private viewportScroller: ViewportScroller,
    private storageService: StorageService,
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.getDashboardData();

    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      // setTimeout(() => {
      this.loading = true;
      // }, 4000);
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
    }
  }
  getDashboardData() {
    this.dashboardService.fetchDashboardData().subscribe(
      (data: any) => {
        console.log('dashboard data001: ' + JSON.stringify(data, null, 4));
        this.dashboard_response_data = data;
      },
      (error: any) => {
        console.error('dashboard error: ' + JSON.stringify(error, null, 4));
      }
    );
  }

  toggleDetailVisibility(c_: string) {
    console.log('c_: ' + c_);
    this.scrollChildrenComponentIntoView(c_);
  }

  scrollChildrenComponentIntoView(a_: string) {
    this.viewportScroller.scrollToAnchor(a_);
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
}
