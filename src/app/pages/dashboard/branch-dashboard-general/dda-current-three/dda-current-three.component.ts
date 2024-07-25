import { Component } from '@angular/core';
import { StorageService } from 'app/services/shared/storage.service';
import { DashboardService } from '../services/dashboard.service';
import { DashboardResponseThree } from './DashboardResponseThree';

@Component({
  selector: 'app-dda-current-three',
  templateUrl: './dda-current-three.component.html',
  styleUrls: ['./dda-current-three.component.css'],
})
export class DdaCurrentThreeComponent {
  data: any;
  options: any;

  dashboard_response_data: any;

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

  constructor(
    private dashboardService: DashboardService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
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
    }
    this.dashboard_response_data = new DashboardResponseThree();
    this.getDashboardDataThree();
  }

  getDashboardDataThree() {
    this.dashboardService.fetchDashboardDataThree().subscribe(
      (data: any) => {
        this.dashboard_response_data = data;
        console.log('dashboard data3: ' + JSON.stringify(data, null, 4));
        this.setDashboardValues();
      },
      (error: any) => {
        console.log('dashboard data: ' + JSON.stringify(error, null, 4));
      }
    );
  }

  setDashboardValues() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    if (this.approver)
      this.data = {
        labels: [
          'ATM',
          'Cash Count',
          'Cash Performance',
          'Cash Management',
          'Negotiable Instrument',
          'Suspense Account',
          'Long Outstanding Item',
          'Loan Advance',
          'Expenses-related findings',
          'Incomplete Account',
          'Transaction related findings',
          'Dormant Inactive Account',
          'Asset Liability',
          'Abnormal Balance',
          'Memorandum Contingent',
        ],
        // ,  and  | Current
        datasets: [
          {
            type: 'line',
            label: 'Approved Audits',
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: [
              this.dashboard_response_data.approved_3_acb,
              this.dashboard_response_data.approved_3_ccb,
              this.dashboard_response_data.approved_3_cpb,
              this.dashboard_response_data.approved_3_cmb,
              this.dashboard_response_data.approved_3_nib,
              this.dashboard_response_data.approved_3_sab,
              this.dashboard_response_data.approved_3_loib,
              this.dashboard_response_data.approved_3_lab,
              this.dashboard_response_data.approved_3_ceb,
              this.dashboard_response_data.approved_3_iab,
              this.dashboard_response_data.approved_3_odb,
              this.dashboard_response_data.approved_3_diab,
              this.dashboard_response_data.approved_3_alb,
              this.dashboard_response_data.approved_3_abb,
              this.dashboard_response_data.approved_3_mcb,
            ],
          },
          {
            type: 'bar',
            label: 'Division Submitted',
            backgroundColor: documentStyle.getPropertyValue('--green-500'),
            data: [
              this.dashboard_response_data.division_submitted_3_acb,
              this.dashboard_response_data.division_submitted_3_ccb,
              this.dashboard_response_data.division_submitted_3_cpb,
              this.dashboard_response_data.division_submitted_3_cmb,
              this.dashboard_response_data.division_submitted_3_nib,
              this.dashboard_response_data.division_submitted_3_sab,
              this.dashboard_response_data.division_submitted_3_loib,
              this.dashboard_response_data.division_submitted_3_lab,
              this.dashboard_response_data.division_submitted_3_ceb,
              this.dashboard_response_data.division_submitted_3_iab,
              this.dashboard_response_data.division_submitted_3_odb,
              this.dashboard_response_data.division_submitted_3_diab,
              this.dashboard_response_data.division_submitted_3_alb,
              this.dashboard_response_data.division_submitted_3_abb,
              this.dashboard_response_data.division_submitted_3_mcb,
            ],
            borderColor: 'white',
            borderWidth: 2,
          },
        ],
      };
    else
      this.data = {
        labels: [
          'ATM',
          'Cash Count',
          'Cash Performance',
          'Cash Management',
          'Negotiable Instrument',
          'Suspense Account',
          'Long Outstanding Item',
          'Loan Advance',
          'Expenses-related findings',
          'Incomplete Account',
          'Transaction related findings',
          'Dormant Inactive Account',
          'Asset Liability',
          'Abnormal Balance',
          'Memorandum Contingent',
        ],
        // ,  and  | Current
        datasets: [
          {
            type: 'line',
            label: 'Approved Audits',
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: [
              this.dashboard_response_data.approved_3_acb,
              this.dashboard_response_data.approved_3_ccb,
              this.dashboard_response_data.approved_3_cpb,
              this.dashboard_response_data.approved_3_cmb,
              this.dashboard_response_data.approved_3_nib,
              this.dashboard_response_data.approved_3_sab,
              this.dashboard_response_data.approved_3_loib,
              this.dashboard_response_data.approved_3_lab,
              this.dashboard_response_data.approved_3_ceb,
              this.dashboard_response_data.approved_3_iab,
              this.dashboard_response_data.approved_3_odb,
              this.dashboard_response_data.approved_3_diab,
              this.dashboard_response_data.approved_3_alb,
              this.dashboard_response_data.approved_3_abb,
              this.dashboard_response_data.approved_3_mcb,
            ],
          },
          {
            type: 'bar',
            label: 'Division Submitted',
            backgroundColor: documentStyle.getPropertyValue('--green-500'),
            data: [
              this.dashboard_response_data.division_submitted_3_acb,
              this.dashboard_response_data.division_submitted_3_ccb,
              this.dashboard_response_data.division_submitted_3_cpb,
              this.dashboard_response_data.division_submitted_3_cmb,
              this.dashboard_response_data.division_submitted_3_nib,
              this.dashboard_response_data.division_submitted_3_sab,
              this.dashboard_response_data.division_submitted_3_loib,
              this.dashboard_response_data.division_submitted_3_lab,
              this.dashboard_response_data.division_submitted_3_ceb,
              this.dashboard_response_data.division_submitted_3_iab,
              this.dashboard_response_data.division_submitted_3_odb,
              this.dashboard_response_data.division_submitted_3_diab,
              this.dashboard_response_data.division_submitted_3_alb,
              this.dashboard_response_data.division_submitted_3_abb,
              this.dashboard_response_data.division_submitted_3_mcb,
            ],
            borderColor: 'white',
            borderWidth: 2,
          },
          {
            type: 'bar',
            label: 'Division Compiled ',
            backgroundColor: documentStyle.getPropertyValue('--orange-500'),
            data: [
              this.dashboard_response_data.division_compiled_3_acb,
              this.dashboard_response_data.division_compiled_3_ccb,
              this.dashboard_response_data.division_compiled_3_cpb,
              this.dashboard_response_data.division_compiled_3_cmb,
              this.dashboard_response_data.division_compiled_3_nib,
              this.dashboard_response_data.division_compiled_3_sab,
              this.dashboard_response_data.division_compiled_3_loib,
              this.dashboard_response_data.division_compiled_3_lab,
              this.dashboard_response_data.division_compiled_3_ceb,
              this.dashboard_response_data.division_compiled_3_iab,
              this.dashboard_response_data.division_compiled_3_odb,
              this.dashboard_response_data.division_compiled_3_diab,
              this.dashboard_response_data.division_compiled_3_alb,
              this.dashboard_response_data.division_compiled_3_abb,
              this.dashboard_response_data.division_compiled_3_mcb,
            ],
          },
        ],
      };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
  }
}
