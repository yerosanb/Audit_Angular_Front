import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/services/shared/storage.service';
import { DashboardService } from '../services/dashboard.service';
import { DashboardResponseOne } from './DashboardResponseOne';

@Component({
  selector: 'app-dpr-current-one',
  templateUrl: './dpr-current-one.component.html',
  styleUrls: ['./dpr-current-one.component.css'],
})
export class DprCurrentOneComponent implements OnInit {
  data: any;
  options: any;

  data1: any;
  options1: any;
  dashboard_response_data: any;

  private roles: string[] = [];
  branch_m = false;
  auditor = false;

  constructor(
    private dashboardService: DashboardService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    const user = this.storageService.getUser();
    this.roles = user.roles;
    this.auditor = this.roles.includes('ROLE_AUDITOR_BFA');
    this.branch_m = this.roles.includes('ROLE_BRANCHM_BFA');
    this.dashboard_response_data = new DashboardResponseOne();
    this.getDashboardDataOne();
  }

  getDashboardDataOne() {
    this.dashboardService.fetchDashboardDataOne().subscribe(
      (data: any) => {
        // console.log('dashboard data: ' + JSON.stringify(data, null, 4));
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
    console.log('broken: ' + this.dashboard_response_data.drafted_1_iab);

    if(this.auditor)
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
          label: 'Drafted | Current',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: [
            this.dashboard_response_data.drafted_1_acb,
            this.dashboard_response_data.drafted_1_ccb,
            this.dashboard_response_data.drafted_1_cpb,
            this.dashboard_response_data.drafted_1_cmb,
            this.dashboard_response_data.drafted_1_nib,
            this.dashboard_response_data.drafted_1_sab,
            this.dashboard_response_data.drafted_1_loib,
            this.dashboard_response_data.drafted_1_lab,
            this.dashboard_response_data.drafted_1_ceb,
            this.dashboard_response_data.drafted_1_iab,
            this.dashboard_response_data.drafted_1_odb,
            this.dashboard_response_data.drafted_1_diab,
            this.dashboard_response_data.drafted_1_alb,
            this.dashboard_response_data.drafted_1_abb,
            this.dashboard_response_data.drafted_1_mcb,
          ],
        },
        {
          label: 'Passed | Current',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: [
            this.dashboard_response_data.passed_1_acb,
            this.dashboard_response_data.passed_1_ccb,
            this.dashboard_response_data.passed_1_cpb,
            this.dashboard_response_data.passed_1_cmb,
            this.dashboard_response_data.passed_1_nib,
            this.dashboard_response_data.passed_1_sab,
            this.dashboard_response_data.passed_1_loib,
            this.dashboard_response_data.passed_1_lab,
            this.dashboard_response_data.passed_1_ceb,
            this.dashboard_response_data.passed_1_iab,
            this.dashboard_response_data.passed_1_odb,
            this.dashboard_response_data.passed_1_diab,
            this.dashboard_response_data.passed_1_alb,
            this.dashboard_response_data.passed_1_abb,
            this.dashboard_response_data.passed_1_mcb,
          ],
        },
        {
          label: 'Reviewed | Current',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          borderColor: documentStyle.getPropertyValue('--green-500'),
          data: [
            this.dashboard_response_data.regional_reviewed_1_acb,
            this.dashboard_response_data.regional_reviewed_1_ccb,
            this.dashboard_response_data.regional_reviewed_1_cpb,
            this.dashboard_response_data.regional_reviewed_1_cmb,
            this.dashboard_response_data.regional_reviewed_1_nib,
            this.dashboard_response_data.regional_reviewed_1_sab,
            this.dashboard_response_data.regional_reviewed_1_loib,
            this.dashboard_response_data.regional_reviewed_1_lab,
            this.dashboard_response_data.regional_reviewed_1_ceb,
            this.dashboard_response_data.regional_reviewed_1_iab,
            this.dashboard_response_data.regional_reviewed_1_odb,
            this.dashboard_response_data.regional_reviewed_1_diab,
            this.dashboard_response_data.regional_reviewed_1_alb,
            this.dashboard_response_data.regional_reviewed_1_abb,
            this.dashboard_response_data.regional_reviewed_1_mcb,
          ],
        },
      ],
    };
    else if(this.branch_m)
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
        //   label: 'Drafted | Current',
        //   backgroundColor: documentStyle.getPropertyValue('--blue-500'),
        //   borderColor: documentStyle.getPropertyValue('--blue-500'),
        //   data: [
        //     this.dashboard_response_data.drafted_1_acb,
        //     this.dashboard_response_data.drafted_1_ccb,
        //     this.dashboard_response_data.drafted_1_cpb,
        //     this.dashboard_response_data.drafted_1_cmb,
        //     this.dashboard_response_data.drafted_1_nib,
        //     this.dashboard_response_data.drafted_1_sab,
        //     this.dashboard_response_data.drafted_1_loib,
        //     this.dashboard_response_data.drafted_1_lab,
        //     this.dashboard_response_data.drafted_1_ceb,
        //     this.dashboard_response_data.drafted_1_iab,
        //     this.dashboard_response_data.drafted_1_odb,
        //     this.dashboard_response_data.drafted_1_diab,
        //     this.dashboard_response_data.drafted_1_alb,
        //     this.dashboard_response_data.drafted_1_abb,
        //     this.dashboard_response_data.drafted_1_mcb,
        //   ],
        // },
        {
          label: 'Passed | Current',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: [
            this.dashboard_response_data.passed_1_acb,
            this.dashboard_response_data.passed_1_ccb,
            this.dashboard_response_data.passed_1_cpb,
            this.dashboard_response_data.passed_1_cmb,
            this.dashboard_response_data.passed_1_nib,
            this.dashboard_response_data.passed_1_sab,
            this.dashboard_response_data.passed_1_loib,
            this.dashboard_response_data.passed_1_lab,
            this.dashboard_response_data.passed_1_ceb,
            this.dashboard_response_data.passed_1_iab,
            this.dashboard_response_data.passed_1_odb,
            this.dashboard_response_data.passed_1_diab,
            this.dashboard_response_data.passed_1_alb,
            this.dashboard_response_data.passed_1_abb,
            this.dashboard_response_data.passed_1_mcb,
          ],
        },
        {
          label: 'Reviewed | Current',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          borderColor: documentStyle.getPropertyValue('--green-500'),
          data: [
            this.dashboard_response_data.regional_reviewed_1_acb,
            this.dashboard_response_data.regional_reviewed_1_ccb,
            this.dashboard_response_data.regional_reviewed_1_cpb,
            this.dashboard_response_data.regional_reviewed_1_cmb,
            this.dashboard_response_data.regional_reviewed_1_nib,
            this.dashboard_response_data.regional_reviewed_1_sab,
            this.dashboard_response_data.regional_reviewed_1_loib,
            this.dashboard_response_data.regional_reviewed_1_lab,
            this.dashboard_response_data.regional_reviewed_1_ceb,
            this.dashboard_response_data.regional_reviewed_1_iab,
            this.dashboard_response_data.regional_reviewed_1_odb,
            this.dashboard_response_data.regional_reviewed_1_diab,
            this.dashboard_response_data.regional_reviewed_1_alb,
            this.dashboard_response_data.regional_reviewed_1_abb,
            this.dashboard_response_data.regional_reviewed_1_mcb,
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
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
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
    if (this.auditor)
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
        datasets: [
          {
            label: 'Drafted Audits',
            data: [
              this.dashboard_response_data.drafted_1_january,
              this.dashboard_response_data.drafted_1_february,
              this.dashboard_response_data.drafted_1_march,
              this.dashboard_response_data.drafted_1_april,
              this.dashboard_response_data.drafted_1_may,
              this.dashboard_response_data.drafted_1_june,
              this.dashboard_response_data.drafted_1_july,
              this.dashboard_response_data.drafted_1_august,
              this.dashboard_response_data.drafted_1_september,
              this.dashboard_response_data.drafted_1_october,
              this.dashboard_response_data.drafted_1_november,
              this.dashboard_response_data.drafted_1_december,
            ],
            fill: false,
            borderColor: documentStyle1.getPropertyValue('--blue-500'),
            tension: 0.4,
            borderWidth: 3,
          },
          {
            label: 'Passed Audits',
            data: [
              this.dashboard_response_data.passed_1_january,
              this.dashboard_response_data.passed_1_february,
              this.dashboard_response_data.passed_1_march,
              this.dashboard_response_data.passed_1_april,
              this.dashboard_response_data.passed_1_may,
              this.dashboard_response_data.passed_1_june,
              this.dashboard_response_data.passed_1_july,
              this.dashboard_response_data.passed_1_august,
              this.dashboard_response_data.passed_1_september,
              this.dashboard_response_data.passed_1_october,
              this.dashboard_response_data.passed_1_november,
              this.dashboard_response_data.passed_1_december,
            ],
            fill: false,
            borderColor: documentStyle1.getPropertyValue('--pink-500'),
            tension: 0.4,
            borderWidth: 3,
          },
          {
            label: 'Reviewed Audits',
            data: [
              this.dashboard_response_data.reviewed_1_january,
              this.dashboard_response_data.reviewed_1_february,
              this.dashboard_response_data.reviewed_1_march,
              this.dashboard_response_data.reviewed_1_april,
              this.dashboard_response_data.reviewed_1_may,
              this.dashboard_response_data.reviewed_1_june,
              this.dashboard_response_data.reviewed_1_july,
              this.dashboard_response_data.reviewed_1_august,
              this.dashboard_response_data.reviewed_1_september,
              this.dashboard_response_data.reviewed_1_october,
              this.dashboard_response_data.reviewed_1_november,
              this.dashboard_response_data.reviewed_1_december,
            ],
            fill: false,
            borderColor: documentStyle1.getPropertyValue('--orange-500'),
            tension: 0.4,
            borderWidth: 3,
          },
        ],
      };
    else if (this.branch_m)
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
        datasets: [
          // {
          //   label: 'Drafted Audits',
          //   data: [
          //     this.dashboard_response_data.drafted_1_january,
          //     this.dashboard_response_data.drafted_1_february,
          //     this.dashboard_response_data.drafted_1_march,
          //     this.dashboard_response_data.drafted_1_april,
          //     this.dashboard_response_data.drafted_1_may,
          //     this.dashboard_response_data.drafted_1_june,
          //     this.dashboard_response_data.drafted_1_july,
          //     this.dashboard_response_data.drafted_1_august,
          //     this.dashboard_response_data.drafted_1_september,
          //     this.dashboard_response_data.drafted_1_october,
          //     this.dashboard_response_data.drafted_1_november,
          //     this.dashboard_response_data.drafted_1_december,
          //   ],
          //   fill: false,
          //   borderColor: documentStyle1.getPropertyValue('--blue-500'),
          //   tension: 0.4,
          //   borderWidth: 3,
          // },
          {
            label: 'Passed Audits',
            data: [
              this.dashboard_response_data.passed_1_january,
              this.dashboard_response_data.passed_1_february,
              this.dashboard_response_data.passed_1_march,
              this.dashboard_response_data.passed_1_april,
              this.dashboard_response_data.passed_1_may,
              this.dashboard_response_data.passed_1_june,
              this.dashboard_response_data.passed_1_july,
              this.dashboard_response_data.passed_1_august,
              this.dashboard_response_data.passed_1_september,
              this.dashboard_response_data.passed_1_october,
              this.dashboard_response_data.passed_1_november,
              this.dashboard_response_data.passed_1_december,
            ],
            fill: false,
            borderColor: documentStyle1.getPropertyValue('--pink-500'),
            tension: 0.4,
            borderWidth: 3,
          },
          {
            label: 'Reviewed Audits',
            data: [
              this.dashboard_response_data.reviewed_1_january,
              this.dashboard_response_data.reviewed_1_february,
              this.dashboard_response_data.reviewed_1_march,
              this.dashboard_response_data.reviewed_1_april,
              this.dashboard_response_data.reviewed_1_may,
              this.dashboard_response_data.reviewed_1_june,
              this.dashboard_response_data.reviewed_1_july,
              this.dashboard_response_data.reviewed_1_august,
              this.dashboard_response_data.reviewed_1_september,
              this.dashboard_response_data.reviewed_1_october,
              this.dashboard_response_data.reviewed_1_november,
              this.dashboard_response_data.reviewed_1_december,
            ],
            fill: false,
            borderColor: documentStyle1.getPropertyValue('--orange-500'),
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

/*
datasets: [
        {
          label: 'My First dataset',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: [
            this.dashboard_response_data.drafted_1_acb,
            this.dashboard_response_data.drafted_1_ccb,
            this.dashboard_response_data.drafted_1_cpb,
            this.dashboard_response_data.drafted_1_cmb,
            this.dashboard_response_data.drafted_1_nib,
            this.dashboard_response_data.drafted_1_sab,
            this.dashboard_response_data.drafted_1_loib,
            this.dashboard_response_data.drafted_1_lab,
            this.dashboard_response_data.drafted_1_ceb,
            this.dashboard_response_data.drafted_1_iab,
            this.dashboard_response_data.drafted_1_odb,
            this.dashboard_response_data.drafted_1_diab,
            this.dashboard_response_data.drafted_1_alb,
            this.dashboard_response_data.drafted_1_abb,
            this.dashboard_response_data.drafted_1_mcb,
          ],
        },
        {
          label: 'My Second dataset',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: [
            this.dashboard_response_data.passed_1_acb,
            this.dashboard_response_data.passed_1_ccb,
            this.dashboard_response_data.passed_1_cpb,
            this.dashboard_response_data.passed_1_cmb,
            this.dashboard_response_data.passed_1_nib,
            this.dashboard_response_data.passed_1_sab,
            this.dashboard_response_data.passed_1_loib,
            this.dashboard_response_data.passed_1_lab,
            this.dashboard_response_data.passed_1_ceb,
            this.dashboard_response_data.passed_1_iab,
            this.dashboard_response_data.passed_1_odb,
            this.dashboard_response_data.passed_1_diab,
            this.dashboard_response_data.passed_1_alb,
            this.dashboard_response_data.passed_1_abb,
            this.dashboard_response_data.passed_1_mcb,
          ],
        },
        {
          label: 'My Third dataset',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          borderColor: documentStyle.getPropertyValue('--green-500'),
          data: [
            this.dashboard_response_data.regional_reviewed_1_acb,
            this.dashboard_response_data.regional_reviewed_1_ccb,
            this.dashboard_response_data.regional_reviewed_1_cpb,
            this.dashboard_response_data.regional_reviewed_1_cmb,
            this.dashboard_response_data.regional_reviewed_1_nib,
            this.dashboard_response_data.regional_reviewed_1_sab,
            this.dashboard_response_data.regional_reviewed_1_loib,
            this.dashboard_response_data.regional_reviewed_1_lab,
            this.dashboard_response_data.regional_reviewed_1_ceb,
            this.dashboard_response_data.regional_reviewed_1_iab,
            this.dashboard_response_data.regional_reviewed_1_odb,
            this.dashboard_response_data.regional_reviewed_1_diab,
            this.dashboard_response_data.regional_reviewed_1_alb,
            this.dashboard_response_data.regional_reviewed_1_abb,
            this.dashboard_response_data.regional_reviewed_1_mcb,
          ],
        },
      ],*/
