import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/services/shared/storage.service';
import { DashboardService } from '../services/dashboard.service';
import { DashboardResponseFour } from './DashboardResponseFour';

@Component({
  selector: 'app-prda-total-four',
  templateUrl: './prda-total-four.component.html',
  styleUrls: ['./prda-total-four.component.css'],
})
export class PrdaTotalFourComponent implements OnInit {
  data: any;
  options: any;
  data1: any;
  options1: any;

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
    this.dashboard_response_data = new DashboardResponseFour();
    this.getDashboardDataFour();
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
  }

  getDashboardDataFour() {
    this.dashboardService.fetchDashboardDataFour().subscribe(
      (data: any) => {
        console.log('dashboard data4: ' + JSON.stringify(data, null, 4));
        this.dashboard_response_data = data;
        this.setDashboardValues();
      },
      (error: any) => {
        console.log('dashboard error: ' + JSON.stringify(error, null, 4));
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

    if (
      Array.from(this.storageService.getUser().roles).includes('ROLE_COMPILER_BFA')
    )
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
        datasets: [
          // {
          //   type: 'line',
          //   label: 'Passed Audits',
          //   borderColor: documentStyle.getPropertyValue('--red-500'),
          //   borderWidth: 2,
          //   fill: false,
          //   tension: 0.4,
          //   data: [
          //     this.dashboard_response_data.passed_4_acb,
          //     this.dashboard_response_data.passed_4_ccb,
          //     this.dashboard_response_data.passed_4_cpb,
          //     this.dashboard_response_data.passed_4_cmb,
          //     this.dashboard_response_data.passed_4_nib,
          //     this.dashboard_response_data.passed_4_sab,
          //     this.dashboard_response_data.passed_4_loib,
          //     this.dashboard_response_data.passed_4_lab,
          //     this.dashboard_response_data.passed_4_ceb,
          //     this.dashboard_response_data.passed_4_iab,
          //     this.dashboard_response_data.passed_4_odb,
          //     this.dashboard_response_data.passed_4_diab,
          //     this.dashboard_response_data.passed_4_alb,
          //     this.dashboard_response_data.passed_4_abb,
          //     this.dashboard_response_data.passed_4_mcb,
          //   ],
          // },
          // {
          //   type: 'bar',
          //   label: 'Regional Compiled Audits',
          //   backgroundColor: documentStyle.getPropertyValue('--green-500'),
          //   data: [
          //     this.dashboard_response_data.regional_compiled_4_acb,
          //     this.dashboard_response_data.regional_compiled_4_ccb,
          //     this.dashboard_response_data.regional_compiled_4_cpb,
          //     this.dashboard_response_data.regional_compiled_4_cmb,
          //     this.dashboard_response_data.regional_compiled_4_nib,
          //     this.dashboard_response_data.regional_compiled_4_sab,
          //     this.dashboard_response_data.regional_compiled_4_loib,
          //     this.dashboard_response_data.regional_compiled_4_lab,
          //     this.dashboard_response_data.regional_compiled_4_ceb,
          //     this.dashboard_response_data.regional_compiled_4_iab,
          //     this.dashboard_response_data.regional_compiled_4_odb,
          //     this.dashboard_response_data.regional_compiled_4_diab,
          //     this.dashboard_response_data.regional_compiled_4_alb,
          //     this.dashboard_response_data.regional_compiled_4_abb,
          //     this.dashboard_response_data.regional_compiled_4_mcb,
          //   ],
          //   borderColor: 'white',
          //   borderWidth: 2,
          // },
          {
            type: 'bar',
            label: 'Division Compiled Audits',
            backgroundColor: documentStyle.getPropertyValue('--orange-500'),
            data: [
              this.dashboard_response_data.division_compiled_4_acb,
              this.dashboard_response_data.division_compiled_4_ccb,
              this.dashboard_response_data.division_compiled_4_cpb,
              this.dashboard_response_data.division_compiled_4_cmb,
              this.dashboard_response_data.division_compiled_4_nib,
              this.dashboard_response_data.division_compiled_4_sab,
              this.dashboard_response_data.division_compiled_4_loib,
              this.dashboard_response_data.division_compiled_4_lab,
              this.dashboard_response_data.division_compiled_4_ceb,
              this.dashboard_response_data.division_compiled_4_iab,
              this.dashboard_response_data.division_compiled_4_odb,
              this.dashboard_response_data.division_compiled_4_diab,
              this.dashboard_response_data.division_compiled_4_alb,
              this.dashboard_response_data.division_compiled_4_abb,
              this.dashboard_response_data.division_compiled_4_mcb,
            ],
          },
          {
            type: 'bar',
            label: 'Approved Audits',
            backgroundColor: documentStyle.getPropertyValue('--blue-500'),
            data: [
              this.dashboard_response_data.approved_4_acb,
              this.dashboard_response_data.approved_4_ccb,
              this.dashboard_response_data.approved_4_cpb,
              this.dashboard_response_data.approved_4_cmb,
              this.dashboard_response_data.approved_4_nib,
              this.dashboard_response_data.approved_4_sab,
              this.dashboard_response_data.approved_4_loib,
              this.dashboard_response_data.approved_4_lab,
              this.dashboard_response_data.approved_4_ceb,
              this.dashboard_response_data.approved_4_iab,
              this.dashboard_response_data.approved_4_odb,
              this.dashboard_response_data.approved_4_diab,
              this.dashboard_response_data.approved_4_alb,
              this.dashboard_response_data.approved_4_abb,
              this.dashboard_response_data.approved_4_mcb,
            ],
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
        datasets: [
          {
            type: 'line',
            label: 'Passed Audits',
            borderColor: documentStyle.getPropertyValue('--red-500'),
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: [
              this.dashboard_response_data.passed_4_acb,
              this.dashboard_response_data.passed_4_ccb,
              this.dashboard_response_data.passed_4_cpb,
              this.dashboard_response_data.passed_4_cmb,
              this.dashboard_response_data.passed_4_nib,
              this.dashboard_response_data.passed_4_sab,
              this.dashboard_response_data.passed_4_loib,
              this.dashboard_response_data.passed_4_lab,
              this.dashboard_response_data.passed_4_ceb,
              this.dashboard_response_data.passed_4_iab,
              this.dashboard_response_data.passed_4_odb,
              this.dashboard_response_data.passed_4_diab,
              this.dashboard_response_data.passed_4_alb,
              this.dashboard_response_data.passed_4_abb,
              this.dashboard_response_data.passed_4_mcb,
            ],
          },
          {
            type: 'bar',
            label: 'Regional Compiled Audits',
            backgroundColor: documentStyle.getPropertyValue('--green-500'),
            data: [
              this.dashboard_response_data.regional_compiled_4_acb,
              this.dashboard_response_data.regional_compiled_4_ccb,
              this.dashboard_response_data.regional_compiled_4_cpb,
              this.dashboard_response_data.regional_compiled_4_cmb,
              this.dashboard_response_data.regional_compiled_4_nib,
              this.dashboard_response_data.regional_compiled_4_sab,
              this.dashboard_response_data.regional_compiled_4_loib,
              this.dashboard_response_data.regional_compiled_4_lab,
              this.dashboard_response_data.regional_compiled_4_ceb,
              this.dashboard_response_data.regional_compiled_4_iab,
              this.dashboard_response_data.regional_compiled_4_odb,
              this.dashboard_response_data.regional_compiled_4_diab,
              this.dashboard_response_data.regional_compiled_4_alb,
              this.dashboard_response_data.regional_compiled_4_abb,
              this.dashboard_response_data.regional_compiled_4_mcb,
            ],
            borderColor: 'white',
            borderWidth: 2,
          },
          {
            type: 'bar',
            label: 'Division Compiled Audits',
            backgroundColor: documentStyle.getPropertyValue('--orange-500'),
            data: [
              this.dashboard_response_data.division_compiled_4_acb,
              this.dashboard_response_data.division_compiled_4_ccb,
              this.dashboard_response_data.division_compiled_4_cpb,
              this.dashboard_response_data.division_compiled_4_cmb,
              this.dashboard_response_data.division_compiled_4_nib,
              this.dashboard_response_data.division_compiled_4_sab,
              this.dashboard_response_data.division_compiled_4_loib,
              this.dashboard_response_data.division_compiled_4_lab,
              this.dashboard_response_data.division_compiled_4_ceb,
              this.dashboard_response_data.division_compiled_4_iab,
              this.dashboard_response_data.division_compiled_4_odb,
              this.dashboard_response_data.division_compiled_4_diab,
              this.dashboard_response_data.division_compiled_4_alb,
              this.dashboard_response_data.division_compiled_4_abb,
              this.dashboard_response_data.division_compiled_4_mcb,
            ],
          },
          {
            type: 'bar',
            label: 'Approved Audits',
            backgroundColor: documentStyle.getPropertyValue('--blue-500'),
            data: [
              this.dashboard_response_data.approved_4_acb,
              this.dashboard_response_data.approved_4_ccb,
              this.dashboard_response_data.approved_4_cpb,
              this.dashboard_response_data.approved_4_cmb,
              this.dashboard_response_data.approved_4_nib,
              this.dashboard_response_data.approved_4_sab,
              this.dashboard_response_data.approved_4_loib,
              this.dashboard_response_data.approved_4_lab,
              this.dashboard_response_data.approved_4_ceb,
              this.dashboard_response_data.approved_4_iab,
              this.dashboard_response_data.approved_4_odb,
              this.dashboard_response_data.approved_4_diab,
              this.dashboard_response_data.approved_4_alb,
              this.dashboard_response_data.approved_4_abb,
              this.dashboard_response_data.approved_4_mcb,
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

    const documentStyle1 = getComputedStyle(document.documentElement);
    const textColor1 = documentStyle1.getPropertyValue('--text-color');
    const textColorSecondary1 = documentStyle1.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder1 = documentStyle1.getPropertyValue('--surface-border');

    if (
      Array.from(this.storageService.getUser().roles).includes('ROLE_COMPILER_BFA')
    )
      this.data1 = {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        // Passed, Regional Compiled,  and
        datasets: [
          // {
          //   label: 'Passed',
          //   data: [
          //     this.dashboard_response_data.passed_4_january,
          //     this.dashboard_response_data.passed_4_february,
          //     this.dashboard_response_data.passed_4_march,
          //     this.dashboard_response_data.passed_4_april,
          //     this.dashboard_response_data.passed_4_may,
          //     this.dashboard_response_data.passed_4_june,
          //     this.dashboard_response_data.passed_4_july,
          //     this.dashboard_response_data.passed_4_august,
          //     this.dashboard_response_data.passed_4_september,
          //     this.dashboard_response_data.passed_4_october,
          //     this.dashboard_response_data.passed_4_november,
          //     this.dashboard_response_data.passed_4_december,
          //   ],
          //   fill: false,
          //   borderColor: documentStyle1.getPropertyValue('--blue-500'),
          //   tension: 0.4,
          //   borderWidth: 3,
          // },
          // {
          //   label: 'Regional Compiled Audits',
          //   data: [
          //     this.dashboard_response_data.regional_compiled_4_january,
          //     this.dashboard_response_data.regional_compiled_4_february,
          //     this.dashboard_response_data.regional_compiled_4_march,
          //     this.dashboard_response_data.regional_compiled_4_april,
          //     this.dashboard_response_data.regional_compiled_4_may,
          //     this.dashboard_response_data.regional_compiled_4_june,
          //     this.dashboard_response_data.regional_compiled_4_july,
          //     this.dashboard_response_data.regional_compiled_4_august,
          //     this.dashboard_response_data.regional_compiled_4_september,
          //     this.dashboard_response_data.regional_compiled_4_october,
          //     this.dashboard_response_data.regional_compiled_4_november,
          //     this.dashboard_response_data.regional_compiled_4_december,
          //   ],
          //   fill: false,
          //   borderColor: documentStyle1.getPropertyValue('--pink-500'),
          //   tension: 0.4,
          //   borderWidth: 3,
          // },
          {
            label: 'Division Compiled Audits',
            data: [
              this.dashboard_response_data.division_compiled_4_january,
              this.dashboard_response_data.division_compiled_4_february,
              this.dashboard_response_data.division_compiled_4_march,
              this.dashboard_response_data.division_compiled_4_april,
              this.dashboard_response_data.division_compiled_4_may,
              this.dashboard_response_data.division_compiled_4_june,
              this.dashboard_response_data.division_compiled_4_july,
              this.dashboard_response_data.division_compiled_4_august,
              this.dashboard_response_data.division_compiled_4_september,
              this.dashboard_response_data.division_compiled_4_october,
              this.dashboard_response_data.division_compiled_4_november,
              this.dashboard_response_data.division_compiled_4_december,
            ],
            fill: false,
            borderColor: documentStyle1.getPropertyValue('--orange-500'),
            tension: 0.4,
            borderWidth: 3,
          },
          {
            label: 'Approved Audits',
            data: [
              this.dashboard_response_data.approved_4_january,
              this.dashboard_response_data.approved_4_february,
              this.dashboard_response_data.approved_4_march,
              this.dashboard_response_data.approved_4_april,
              this.dashboard_response_data.approved_4_may,
              this.dashboard_response_data.approved_4_june,
              this.dashboard_response_data.approved_4_july,
              this.dashboard_response_data.approved_4_august,
              this.dashboard_response_data.approved_4_september,
              this.dashboard_response_data.approved_4_october,
              this.dashboard_response_data.approved_4_november,
              this.dashboard_response_data.approved_4_december,
            ],
            fill: false,
            borderColor: documentStyle1.getPropertyValue('--green-500'),
            tension: 0.4,
            borderWidth: 3,
          },
        ],
      };
    else
      this.data1 = {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        // Passed, Regional Compiled,  and
        datasets: [
          {
            label: 'Passed',
            data: [
              this.dashboard_response_data.passed_4_january,
              this.dashboard_response_data.passed_4_february,
              this.dashboard_response_data.passed_4_march,
              this.dashboard_response_data.passed_4_april,
              this.dashboard_response_data.passed_4_may,
              this.dashboard_response_data.passed_4_june,
              this.dashboard_response_data.passed_4_july,
              this.dashboard_response_data.passed_4_august,
              this.dashboard_response_data.passed_4_september,
              this.dashboard_response_data.passed_4_october,
              this.dashboard_response_data.passed_4_november,
              this.dashboard_response_data.passed_4_december,
            ],
            fill: false,
            borderColor: documentStyle1.getPropertyValue('--blue-500'),
            tension: 0.4,
            borderWidth: 3,
          },
          {
            label: 'Regional Compiled Audits',
            data: [
              this.dashboard_response_data.regional_compiled_4_january,
              this.dashboard_response_data.regional_compiled_4_february,
              this.dashboard_response_data.regional_compiled_4_march,
              this.dashboard_response_data.regional_compiled_4_april,
              this.dashboard_response_data.regional_compiled_4_may,
              this.dashboard_response_data.regional_compiled_4_june,
              this.dashboard_response_data.regional_compiled_4_july,
              this.dashboard_response_data.regional_compiled_4_august,
              this.dashboard_response_data.regional_compiled_4_september,
              this.dashboard_response_data.regional_compiled_4_october,
              this.dashboard_response_data.regional_compiled_4_november,
              this.dashboard_response_data.regional_compiled_4_december,
            ],
            fill: false,
            borderColor: documentStyle1.getPropertyValue('--pink-500'),
            tension: 0.4,
            borderWidth: 3,
          },
          {
            label: 'Division Compiled Audits',
            data: [
              this.dashboard_response_data.division_compiled_4_january,
              this.dashboard_response_data.division_compiled_4_february,
              this.dashboard_response_data.division_compiled_4_march,
              this.dashboard_response_data.division_compiled_4_april,
              this.dashboard_response_data.division_compiled_4_may,
              this.dashboard_response_data.division_compiled_4_june,
              this.dashboard_response_data.division_compiled_4_july,
              this.dashboard_response_data.division_compiled_4_august,
              this.dashboard_response_data.division_compiled_4_september,
              this.dashboard_response_data.division_compiled_4_october,
              this.dashboard_response_data.division_compiled_4_november,
              this.dashboard_response_data.division_compiled_4_december,
            ],
            fill: false,
            borderColor: documentStyle1.getPropertyValue('--orange-500'),
            tension: 0.4,
            borderWidth: 3,
          },
          {
            label: 'Approved Audits',
            data: [
              this.dashboard_response_data.approved_4_january,
              this.dashboard_response_data.approved_4_february,
              this.dashboard_response_data.approved_4_march,
              this.dashboard_response_data.approved_4_april,
              this.dashboard_response_data.approved_4_may,
              this.dashboard_response_data.approved_4_june,
              this.dashboard_response_data.approved_4_july,
              this.dashboard_response_data.approved_4_august,
              this.dashboard_response_data.approved_4_september,
              this.dashboard_response_data.approved_4_october,
              this.dashboard_response_data.approved_4_november,
              this.dashboard_response_data.approved_4_december,
            ],
            fill: false,
            borderColor: documentStyle1.getPropertyValue('--green-500'),
            tension: 0.4,
            borderWidth: 3,
          },
        ],
      };

    this.options1 = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor1,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary1,
          },
          grid: {
            color: surfaceBorder1,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary1,
          },
          grid: {
            color: surfaceBorder1,
            drawBorder: false,
          },
        },
      },
    };
  }
}
