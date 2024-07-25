import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/services/shared/storage.service';
import { DashboardService } from '../services/dashboard.service';
import { DashboardResponseTwo } from './DashboardResponseTwo';

@Component({
  selector: 'app-rrd-current-two',
  templateUrl: './rrd-current-two.component.html',
  styleUrls: ['./rrd-current-two.component.css'],
})
export class RrdCurrentTwoComponent implements OnInit {
  radarData: any;
  radarOptions: any;

  multiSeriesData: any;
  multiSeriesOptions: any;

  dashboard_response_data: any;

  isLoggedIn = false;
  loading = false;
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
    this.dashboard_response_data = new DashboardResponseTwo();
    // if (
    //   Array.from(this.storageService.getUser().roles).includes(
    //     'ROLE_AUDITOR_BFA'
    //   ) ||
    //   Array.from(this.storageService.getUser().roles).includes('ROLE_BRANCHM_BFA')
    // )
    this.getDashboardDataTwo();
    // else if (
    //   Array.from(this.storageService.getUser().roles).includes(
    //     'ROLE_REVIEWER_BFA'
    //   ) ||
    //   Array.from(this.storageService.getUser().roles).includes('ROLE_REGIONALD_BFA')
    // )
    //   this.getDashboardDataTwoReviewer();
  }

  getDashboardDataTwo() {
    this.dashboardService.fetchDashboardDataTwo().subscribe(
      (data: any) => {
        console.log('dashboard data212345: ' + JSON.stringify(data, null, 4));
        this.dashboard_response_data = data;
        this.setDashboardValues();
      },
      (error: any) => {
        console.log('dashboard data: ' + JSON.stringify(error, null, 4));
      }
    );
  }

  setDashboardValues() {
    if (
      Array.from(this.storageService.getUser().roles).includes(
        'ROLE_COMPILER_BFA'
      )
    )
      this.multiSeriesData = {
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
          //   data: [
          //     this.dashboard_response_data.regional_compiled_2_acb,
          //     this.dashboard_response_data.regional_compiled_2_ccb,
          //     this.dashboard_response_data.regional_compiled_2_cpb,
          //     this.dashboard_response_data.regional_compiled_2_cmb,
          //     this.dashboard_response_data.regional_compiled_2_nib,
          //     this.dashboard_response_data.regional_compiled_2_sab,
          //     this.dashboard_response_data.regional_compiled_2_loib,
          //     this.dashboard_response_data.regional_compiled_2_lab,
          //     this.dashboard_response_data.regional_compiled_2_ceb,
          //     this.dashboard_response_data.regional_compiled_2_iab,
          //     this.dashboard_response_data.regional_compiled_2_odb,
          //     this.dashboard_response_data.regional_compiled_2_diab,
          //     this.dashboard_response_data.regional_compiled_2_alb,
          //     this.dashboard_response_data.regional_compiled_2_abb,
          //     this.dashboard_response_data.regional_compiled_2_mcb,
          //   ],
          // },
          {
            data: [
              this.dashboard_response_data.regional_submitted_2_acb,
              this.dashboard_response_data.regional_submitted_2_ccb,
              this.dashboard_response_data.regional_submitted_2_cpb,
              this.dashboard_response_data.regional_submitted_2_cmb,
              this.dashboard_response_data.regional_submitted_2_nib,
              this.dashboard_response_data.regional_submitted_2_sab,
              this.dashboard_response_data.regional_submitted_2_loib,
              this.dashboard_response_data.regional_submitted_2_lab,
              this.dashboard_response_data.regional_submitted_2_ceb,
              this.dashboard_response_data.regional_submitted_2_iab,
              this.dashboard_response_data.regional_submitted_2_odb,
              this.dashboard_response_data.regional_submitted_2_diab,
              this.dashboard_response_data.regional_submitted_2_alb,
              this.dashboard_response_data.regional_submitted_2_abb,
              this.dashboard_response_data.regional_submitted_2_mcb,
            ],
          },
          {
            data: [
              this.dashboard_response_data.division_reviewed_2_acb,
              this.dashboard_response_data.division_reviewed_2_ccb,
              this.dashboard_response_data.division_reviewed_2_cpb,
              this.dashboard_response_data.division_reviewed_2_cmb,
              this.dashboard_response_data.division_reviewed_2_nib,
              this.dashboard_response_data.division_reviewed_2_sab,
              this.dashboard_response_data.division_reviewed_2_loib,
              this.dashboard_response_data.division_reviewed_2_lab,
              this.dashboard_response_data.division_reviewed_2_ceb,
              this.dashboard_response_data.division_reviewed_2_iab,
              this.dashboard_response_data.division_reviewed_2_odb,
              this.dashboard_response_data.division_reviewed_2_diab,
              this.dashboard_response_data.division_reviewed_2_alb,
              this.dashboard_response_data.division_reviewed_2_abb,
              this.dashboard_response_data.division_reviewed_2_mcb,
            ],
          },
        ],
      };
    else if (this.reviewer)
      this.multiSeriesData = {
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
            data: [
              this.dashboard_response_data.passed_2_acb,
              this.dashboard_response_data.passed_2_ccb,
              this.dashboard_response_data.passed_2_cpb,
              this.dashboard_response_data.passed_2_cmb,
              this.dashboard_response_data.passed_2_nib,
              this.dashboard_response_data.passed_2_sab,
              this.dashboard_response_data.passed_2_loib,
              this.dashboard_response_data.passed_2_lab,
              this.dashboard_response_data.passed_2_ceb,
              this.dashboard_response_data.passed_2_iab,
              this.dashboard_response_data.passed_2_odb,
              this.dashboard_response_data.passed_2_diab,
              this.dashboard_response_data.passed_2_alb,
              this.dashboard_response_data.passed_2_abb,
              this.dashboard_response_data.passed_2_mcb,
            ],
          },
          {
            data: [
              this.dashboard_response_data.regional_compiled_2_acb,
              this.dashboard_response_data.regional_compiled_2_ccb,
              this.dashboard_response_data.regional_compiled_2_cpb,
              this.dashboard_response_data.regional_compiled_2_cmb,
              this.dashboard_response_data.regional_compiled_2_nib,
              this.dashboard_response_data.regional_compiled_2_sab,
              this.dashboard_response_data.regional_compiled_2_loib,
              this.dashboard_response_data.regional_compiled_2_lab,
              this.dashboard_response_data.regional_compiled_2_ceb,
              this.dashboard_response_data.regional_compiled_2_iab,
              this.dashboard_response_data.regional_compiled_2_odb,
              this.dashboard_response_data.regional_compiled_2_diab,
              this.dashboard_response_data.regional_compiled_2_alb,
              this.dashboard_response_data.regional_compiled_2_abb,
              this.dashboard_response_data.regional_compiled_2_mcb,
            ],
          },
          {
            data: [
              this.dashboard_response_data.regional_submitted_2_acb,
              this.dashboard_response_data.regional_submitted_2_ccb,
              this.dashboard_response_data.regional_submitted_2_cpb,
              this.dashboard_response_data.regional_submitted_2_cmb,
              this.dashboard_response_data.regional_submitted_2_nib,
              this.dashboard_response_data.regional_submitted_2_sab,
              this.dashboard_response_data.regional_submitted_2_loib,
              this.dashboard_response_data.regional_submitted_2_lab,
              this.dashboard_response_data.regional_submitted_2_ceb,
              this.dashboard_response_data.regional_submitted_2_iab,
              this.dashboard_response_data.regional_submitted_2_odb,
              this.dashboard_response_data.regional_submitted_2_diab,
              this.dashboard_response_data.regional_submitted_2_alb,
              this.dashboard_response_data.regional_submitted_2_abb,
              this.dashboard_response_data.regional_submitted_2_mcb,
            ],
          },
          {
            data: [
              this.dashboard_response_data.division_reviewed_2_acb,
              this.dashboard_response_data.division_reviewed_2_ccb,
              this.dashboard_response_data.division_reviewed_2_cpb,
              this.dashboard_response_data.division_reviewed_2_cmb,
              this.dashboard_response_data.division_reviewed_2_nib,
              this.dashboard_response_data.division_reviewed_2_sab,
              this.dashboard_response_data.division_reviewed_2_loib,
              this.dashboard_response_data.division_reviewed_2_lab,
              this.dashboard_response_data.division_reviewed_2_ceb,
              this.dashboard_response_data.division_reviewed_2_iab,
              this.dashboard_response_data.division_reviewed_2_odb,
              this.dashboard_response_data.division_reviewed_2_diab,
              this.dashboard_response_data.division_reviewed_2_alb,
              this.dashboard_response_data.division_reviewed_2_abb,
              this.dashboard_response_data.division_reviewed_2_mcb,
            ],
          },
        ],
      };
    else
      this.multiSeriesData = {
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
            data: [
              this.dashboard_response_data.regional_compiled_2_acb,
              this.dashboard_response_data.regional_compiled_2_ccb,
              this.dashboard_response_data.regional_compiled_2_cpb,
              this.dashboard_response_data.regional_compiled_2_cmb,
              this.dashboard_response_data.regional_compiled_2_nib,
              this.dashboard_response_data.regional_compiled_2_sab,
              this.dashboard_response_data.regional_compiled_2_loib,
              this.dashboard_response_data.regional_compiled_2_lab,
              this.dashboard_response_data.regional_compiled_2_ceb,
              this.dashboard_response_data.regional_compiled_2_iab,
              this.dashboard_response_data.regional_compiled_2_odb,
              this.dashboard_response_data.regional_compiled_2_diab,
              this.dashboard_response_data.regional_compiled_2_alb,
              this.dashboard_response_data.regional_compiled_2_abb,
              this.dashboard_response_data.regional_compiled_2_mcb,
            ],
          },
          {
            data: [
              this.dashboard_response_data.regional_submitted_2_acb,
              this.dashboard_response_data.regional_submitted_2_ccb,
              this.dashboard_response_data.regional_submitted_2_cpb,
              this.dashboard_response_data.regional_submitted_2_cmb,
              this.dashboard_response_data.regional_submitted_2_nib,
              this.dashboard_response_data.regional_submitted_2_sab,
              this.dashboard_response_data.regional_submitted_2_loib,
              this.dashboard_response_data.regional_submitted_2_lab,
              this.dashboard_response_data.regional_submitted_2_ceb,
              this.dashboard_response_data.regional_submitted_2_iab,
              this.dashboard_response_data.regional_submitted_2_odb,
              this.dashboard_response_data.regional_submitted_2_diab,
              this.dashboard_response_data.regional_submitted_2_alb,
              this.dashboard_response_data.regional_submitted_2_abb,
              this.dashboard_response_data.regional_submitted_2_mcb,
            ],
          },
          {
            data: [
              this.dashboard_response_data.division_reviewed_2_acb,
              this.dashboard_response_data.division_reviewed_2_ccb,
              this.dashboard_response_data.division_reviewed_2_cpb,
              this.dashboard_response_data.division_reviewed_2_cmb,
              this.dashboard_response_data.division_reviewed_2_nib,
              this.dashboard_response_data.division_reviewed_2_sab,
              this.dashboard_response_data.division_reviewed_2_loib,
              this.dashboard_response_data.division_reviewed_2_lab,
              this.dashboard_response_data.division_reviewed_2_ceb,
              this.dashboard_response_data.division_reviewed_2_iab,
              this.dashboard_response_data.division_reviewed_2_odb,
              this.dashboard_response_data.division_reviewed_2_diab,
              this.dashboard_response_data.division_reviewed_2_alb,
              this.dashboard_response_data.division_reviewed_2_abb,
              this.dashboard_response_data.division_reviewed_2_mcb,
            ],
          },
        ],
      };
    this.multiSeriesOptions = {
      series: {
        pie: {
          show: true,
          radius: 1,
          label: {
            show: true,
            radius: 2 / 3,
            formatter: function (label: any, series: any) {
              return (
                '<div style="font-size: 12px; text-align: center; padding: 8px; color: #fff; background-color: rgba(0,0,0,0.8);">' +
                label +
                ': ' +
                Math.round(series.percent) +
                '%</div>'
              );
            },
            background: {
              opacity: 0.5,
            },
          },
        },
      },
      legend: {
        show: true,
      },
    };
    if (
      Array.from(this.storageService.getUser().roles).includes(
        'ROLE_COMPILER_BFA'
      )
    )
      this.radarData = {
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
          //   label: 'Regional Compiled Audits',
          //   backgroundColor: 'rgba(51, 102, 204, 0.5)',
          //   borderColor: 'rgba(51, 102, 204, 1)',
          //   data: [
          //     this.dashboard_response_data.regional_compiled_2_acb,
          //     this.dashboard_response_data.regional_compiled_2_ccb,
          //     this.dashboard_response_data.regional_compiled_2_cpb,
          //     this.dashboard_response_data.regional_compiled_2_cmb,
          //     this.dashboard_response_data.regional_compiled_2_nib,
          //     this.dashboard_response_data.regional_compiled_2_sab,
          //     this.dashboard_response_data.regional_compiled_2_loib,
          //     this.dashboard_response_data.regional_compiled_2_lab,
          //     this.dashboard_response_data.regional_compiled_2_ceb,
          //     this.dashboard_response_data.regional_compiled_2_iab,
          //     this.dashboard_response_data.regional_compiled_2_odb,
          //     this.dashboard_response_data.regional_compiled_2_diab,
          //     this.dashboard_response_data.regional_compiled_2_alb,
          //     this.dashboard_response_data.regional_compiled_2_abb,
          //     this.dashboard_response_data.regional_compiled_2_mcb,
          //   ],
          // },
          {
            label: 'Regional Submitted Audits',
            backgroundColor: 'rgba(255, 102, 204, 0.5)',
            borderColor: 'rgba(255, 102, 204, 1)',
            data: [
              this.dashboard_response_data.regional_submitted_2_acb,
              this.dashboard_response_data.regional_submitted_2_ccb,
              this.dashboard_response_data.regional_submitted_2_cpb,
              this.dashboard_response_data.regional_submitted_2_cmb,
              this.dashboard_response_data.regional_submitted_2_nib,
              this.dashboard_response_data.regional_submitted_2_sab,
              this.dashboard_response_data.regional_submitted_2_loib,
              this.dashboard_response_data.regional_submitted_2_lab,
              this.dashboard_response_data.regional_submitted_2_ceb,
              this.dashboard_response_data.regional_submitted_2_iab,
              this.dashboard_response_data.regional_submitted_2_odb,
              this.dashboard_response_data.regional_submitted_2_diab,
              this.dashboard_response_data.regional_submitted_2_alb,
              this.dashboard_response_data.regional_submitted_2_abb,
              this.dashboard_response_data.regional_submitted_2_mcb,
            ],
          },
          {
            label: 'Division Reviewed Audits',
            backgroundColor: 'rgba(102, 204, 102, 0.5)',
            borderColor: 'rgba(102, 204, 102, 1)',
            data: [
              this.dashboard_response_data.division_reviewed_2_acb,
              this.dashboard_response_data.division_reviewed_2_ccb,
              this.dashboard_response_data.division_reviewed_2_cpb,
              this.dashboard_response_data.division_reviewed_2_cmb,
              this.dashboard_response_data.division_reviewed_2_nib,
              this.dashboard_response_data.division_reviewed_2_sab,
              this.dashboard_response_data.division_reviewed_2_loib,
              this.dashboard_response_data.division_reviewed_2_lab,
              this.dashboard_response_data.division_reviewed_2_ceb,
              this.dashboard_response_data.division_reviewed_2_iab,
              this.dashboard_response_data.division_reviewed_2_odb,
              this.dashboard_response_data.division_reviewed_2_diab,
              this.dashboard_response_data.division_reviewed_2_alb,
              this.dashboard_response_data.division_reviewed_2_abb,
              this.dashboard_response_data.division_reviewed_2_mcb,
            ],
          },
        ],
      };
    else if (this.reviewer)
      this.radarData = {
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
            label: 'Pending Audits',
            backgroundColor: '#D9B611',
            borderColor: '#F7CA18',
            data: [
              this.dashboard_response_data.passed_2_acb,
              this.dashboard_response_data.passed_2_ccb,
              this.dashboard_response_data.passed_2_cpb,
              this.dashboard_response_data.passed_2_cmb,
              this.dashboard_response_data.passed_2_nib,
              this.dashboard_response_data.passed_2_sab,
              this.dashboard_response_data.passed_2_loib,
              this.dashboard_response_data.passed_2_lab,
              this.dashboard_response_data.passed_2_ceb,
              this.dashboard_response_data.passed_2_iab,
              this.dashboard_response_data.passed_2_odb,
              this.dashboard_response_data.passed_2_diab,
              this.dashboard_response_data.passed_2_alb,
              this.dashboard_response_data.passed_2_abb,
              this.dashboard_response_data.passed_2_mcb,
            ],
          },
          {
            label: 'Regional Compiled Audits',
            backgroundColor: 'rgba(51, 102, 204, 0.5)',
            borderColor: 'rgba(51, 102, 204, 1)',
            data: [
              this.dashboard_response_data.regional_compiled_2_acb,
              this.dashboard_response_data.regional_compiled_2_ccb,
              this.dashboard_response_data.regional_compiled_2_cpb,
              this.dashboard_response_data.regional_compiled_2_cmb,
              this.dashboard_response_data.regional_compiled_2_nib,
              this.dashboard_response_data.regional_compiled_2_sab,
              this.dashboard_response_data.regional_compiled_2_loib,
              this.dashboard_response_data.regional_compiled_2_lab,
              this.dashboard_response_data.regional_compiled_2_ceb,
              this.dashboard_response_data.regional_compiled_2_iab,
              this.dashboard_response_data.regional_compiled_2_odb,
              this.dashboard_response_data.regional_compiled_2_diab,
              this.dashboard_response_data.regional_compiled_2_alb,
              this.dashboard_response_data.regional_compiled_2_abb,
              this.dashboard_response_data.regional_compiled_2_mcb,
            ],
          },
          {
            label: 'Regional Submitted Audits',
            backgroundColor: 'rgba(255, 102, 204, 0.5)',
            borderColor: 'rgba(255, 102, 204, 1)',
            data: [
              this.dashboard_response_data.regional_submitted_2_acb,
              this.dashboard_response_data.regional_submitted_2_ccb,
              this.dashboard_response_data.regional_submitted_2_cpb,
              this.dashboard_response_data.regional_submitted_2_cmb,
              this.dashboard_response_data.regional_submitted_2_nib,
              this.dashboard_response_data.regional_submitted_2_sab,
              this.dashboard_response_data.regional_submitted_2_loib,
              this.dashboard_response_data.regional_submitted_2_lab,
              this.dashboard_response_data.regional_submitted_2_ceb,
              this.dashboard_response_data.regional_submitted_2_iab,
              this.dashboard_response_data.regional_submitted_2_odb,
              this.dashboard_response_data.regional_submitted_2_diab,
              this.dashboard_response_data.regional_submitted_2_alb,
              this.dashboard_response_data.regional_submitted_2_abb,
              this.dashboard_response_data.regional_submitted_2_mcb,
            ],
          },
          {
            label: 'Division Reviewed Audits',
            backgroundColor: 'rgba(102, 204, 102, 0.5)',
            borderColor: 'rgba(102, 204, 102, 1)',
            data: [
              this.dashboard_response_data.division_reviewed_2_acb,
              this.dashboard_response_data.division_reviewed_2_ccb,
              this.dashboard_response_data.division_reviewed_2_cpb,
              this.dashboard_response_data.division_reviewed_2_cmb,
              this.dashboard_response_data.division_reviewed_2_nib,
              this.dashboard_response_data.division_reviewed_2_sab,
              this.dashboard_response_data.division_reviewed_2_loib,
              this.dashboard_response_data.division_reviewed_2_lab,
              this.dashboard_response_data.division_reviewed_2_ceb,
              this.dashboard_response_data.division_reviewed_2_iab,
              this.dashboard_response_data.division_reviewed_2_odb,
              this.dashboard_response_data.division_reviewed_2_diab,
              this.dashboard_response_data.division_reviewed_2_alb,
              this.dashboard_response_data.division_reviewed_2_abb,
              this.dashboard_response_data.division_reviewed_2_mcb,
            ],
          },
        ],
      };
    else
      this.radarData = {
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
          label: 'Regional Compiled Audits',
          backgroundColor: 'rgba(51, 102, 204, 0.5)',
          borderColor: 'rgba(51, 102, 204, 1)',
          data: [
            this.dashboard_response_data.regional_compiled_2_acb,
            this.dashboard_response_data.regional_compiled_2_ccb,
            this.dashboard_response_data.regional_compiled_2_cpb,
            this.dashboard_response_data.regional_compiled_2_cmb,
            this.dashboard_response_data.regional_compiled_2_nib,
            this.dashboard_response_data.regional_compiled_2_sab,
            this.dashboard_response_data.regional_compiled_2_loib,
            this.dashboard_response_data.regional_compiled_2_lab,
            this.dashboard_response_data.regional_compiled_2_ceb,
            this.dashboard_response_data.regional_compiled_2_iab,
            this.dashboard_response_data.regional_compiled_2_odb,
            this.dashboard_response_data.regional_compiled_2_diab,
            this.dashboard_response_data.regional_compiled_2_alb,
            this.dashboard_response_data.regional_compiled_2_abb,
            this.dashboard_response_data.regional_compiled_2_mcb,
          ],
        },
        {
          label: 'Regional Submitted Audits',
          backgroundColor: 'rgba(255, 102, 204, 0.5)',
          borderColor: 'rgba(255, 102, 204, 1)',
          data: [
            this.dashboard_response_data.regional_submitted_2_acb,
            this.dashboard_response_data.regional_submitted_2_ccb,
            this.dashboard_response_data.regional_submitted_2_cpb,
            this.dashboard_response_data.regional_submitted_2_cmb,
            this.dashboard_response_data.regional_submitted_2_nib,
            this.dashboard_response_data.regional_submitted_2_sab,
            this.dashboard_response_data.regional_submitted_2_loib,
            this.dashboard_response_data.regional_submitted_2_lab,
            this.dashboard_response_data.regional_submitted_2_ceb,
            this.dashboard_response_data.regional_submitted_2_iab,
            this.dashboard_response_data.regional_submitted_2_odb,
            this.dashboard_response_data.regional_submitted_2_diab,
            this.dashboard_response_data.regional_submitted_2_alb,
            this.dashboard_response_data.regional_submitted_2_abb,
            this.dashboard_response_data.regional_submitted_2_mcb,
          ],
        },
        {
          label: 'Division Reviewed Audits',
          backgroundColor: 'rgba(102, 204, 102, 0.5)',
          borderColor: 'rgba(102, 204, 102, 1)',
          data: [
            this.dashboard_response_data.division_reviewed_2_acb,
            this.dashboard_response_data.division_reviewed_2_ccb,
            this.dashboard_response_data.division_reviewed_2_cpb,
            this.dashboard_response_data.division_reviewed_2_cmb,
            this.dashboard_response_data.division_reviewed_2_nib,
            this.dashboard_response_data.division_reviewed_2_sab,
            this.dashboard_response_data.division_reviewed_2_loib,
            this.dashboard_response_data.division_reviewed_2_lab,
            this.dashboard_response_data.division_reviewed_2_ceb,
            this.dashboard_response_data.division_reviewed_2_iab,
            this.dashboard_response_data.division_reviewed_2_odb,
            this.dashboard_response_data.division_reviewed_2_diab,
            this.dashboard_response_data.division_reviewed_2_alb,
            this.dashboard_response_data.division_reviewed_2_abb,
            this.dashboard_response_data.division_reviewed_2_mcb,
          ],
        },
      ],
    };

    this.radarOptions = {
      scale: {
        ticks: {
          beginAtZero: true,
          max: 100,
        },
      },
    };
  }
}
