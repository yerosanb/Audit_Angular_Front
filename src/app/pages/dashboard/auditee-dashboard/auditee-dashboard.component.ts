import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from 'app/models/admin/user';
import { Audit_ISM } from 'app/models/auditor/audit_ISM';
import { AuditorDashboardData } from 'app/models/auditor/auditor-dashboard-data';
import { UserService } from 'app/services/admin/user.service';
import { Audit_ISMService } from 'app/services/auditor/audit_ISM.service';
import { AppConfig } from 'app/services/reviewer/app-config';
import { AppConfigService } from 'app/services/reviewer/app-config.service';
import { RecentActivityService } from 'app/services/shared/recent_activity/recent-activity.service';
import { StorageService } from 'app/services/shared/storage.service';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
 //import { MessageService } from 'primeng/api/messageservice';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
//import {MenuItem} from 'primeng/api';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-auditee-dashboard',
  templateUrl: './auditee-dashboard.component.html',
  styleUrls: ['./auditee-dashboard.component.css'],
})
export class AuditeeDashboardComponent {
  @ViewChild('routerOutlet', { read: ElementRef }) routerOutletRef!: ElementRef;
  isLoggedIn = false;
  isDetailVisible = false;
  
  currentUser = new User();
  auditISM: Audit_ISM[] = [];
  auditorDashboardData = new AuditorDashboardData();

  audits: Audit_ISM[];

  //////////////////////////////////
  basicData: any;

  multiAxisData: any;
  auditsPerDirectorateData: any;

  multiAxisOptions: any;

  lineStylesData: any;

  basicOptions: any;

  subscription: Subscription;

  config: AppConfig;

  chartOptions: any;

  stackedData: any;

  stackedOptions: any;

  horizontalOptions: any;
  //// bar chart data
  basicDataBarChart: any;

  basicOptionsBarChart: any;

  multiAxisDataBarChart: any;

  chartOptionsBarChart: any;

  multiAxisOptionsBarChart: any;

  stackedDataBarChart: any;
  stackedDataBarChartFindingStatus: any;
  DataBarChartFindingStatus: any;
  doughnut_data: any;
  chartOptionsDoughnut: any;
  horizontal_bar_chart_data: any;

  stackedOptionsBarChart: any;

  horizontalOptionsBarChart: any;

  subscriptionBarChart: Subscription;

  configBarChart: AppConfig;
  /////   Dougnnut////////
  datadoughnut: any;

  chartOptionsdoughnut: any;

  subscriptiondoughnut: Subscription;

  configdoughnut: AppConfig;
  ///// Pie Chart //////
  polarChartData: any;
  polarChartFindingStatusData: any;
  polarChartOptions: any;

  chartOptionsPie: any;
  subscriptionPie: Subscription;
  configPie: AppConfig;

  radar_data: any;

  line_chart_data: any;

  loading = true;
  live = true;

//===========================================================================================


data1: any;

chartOptions11! : any;

subscription11 !: Subscription;

config11 !: AppConfig;

//=====
basicData1: any;

multiAxisData1: any;

multiAxisOptions1: any;

lineStylesData1: any;

basicOptions1: any;


//==========================

scrollableItems: MenuItem[];

activeItem2: MenuItem;


cities: City[];

selectedCity: City;
 

// subscription: Subscription;

// config: AppConfig;
//============================
  constructor(
    private messageService: MessageService,
    private viewportScroller: ViewportScroller,
    private configService: AppConfigService,
    private storageService: StorageService,
    private recentActivityService: RecentActivityService,
    private userService: UserService,
    private auditorDashboardService: Audit_ISMService,
    private router: Router,
    ) {}

  ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      setTimeout(() => {
        this.loading = true;
      }, 4000);
      this.getDashBoardData();
    }

    this.multiAxisOptions = {
      stacked: false,
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            color: '#495057',
          },
          grid: {
            drawOnChartArea: false,
            color: '#ebedef',
          },
        },
      },
    };

    this.multiAxisOptionsBarChart = {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
        tooltips: {
          mode: 'index',
          intersect: true,
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            min: 0,
            max: 100,
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false,
            color: '#ebedef',
          },
          ticks: {
            min: 0,
            max: 100,
            color: '#495057',
          },
        },
      },
    };

    this.horizontalOptionsBarChart = {
      indexAxis: 'y',
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };

    this.stackedOptionsBarChart = {
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    };

    //============================
    this.data1 = {
      labels: ['A','B','C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }
      ]
  };
  this.config = this.configService.config;
  this.updateChartOptions11();
  this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
      this.updateChartOptions11();
  });

    //================================
    this.basicData1 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: '#42A5F5',
              tension: .4
          },

          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderColor: '#FFA726',
              tension: .4
          }, 
            {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: '#FFA726',
            tension: .4
        },
           {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#FFA726',
          tension: .4
      },   {
        label: 'Second Dataset',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: '#FFA726',
        tension: .4
    }
      ]
  };//==============


  this.multiAxisData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Dataset 1',
        fill: false,
        borderColor: '#42A5F5',
        yAxisID: 'y',
        tension: .4,
        data: [65, 59, 80, 81, 56, 55, 10]
    }, {
        label: 'Dataset 2',
        fill: false,
        borderColor: '#00bb7e',
        yAxisID: 'y1',
        tension: .4,
        data: [28, 48, 40, 19, 86, 27, 90]
    }]
};

this.stackedData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
      type: 'bar',
      label: 'Dataset 1',
      backgroundColor: '#42A5F5',
      data: [
          50,
          25,
          12,
          48,
          90,
          76,
          42
      ]
  }, {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: '#66BB6A',
      data: [
          21,
          84,
          24,
          75,
          37,
          65,
          34
      ]
  }, {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: '#FFA726',
      data: [
          41,
          52,
          24,
          74,
          23,
          21,
          32
      ]
  }]
};


this.scrollableItems = Array.from({ length: 50 }, (_, i) => ({ label: `Tab ${i + 1}`, icon: `pi pi-fw pi-display` }));
this.activeItem2 = this.scrollableItems[0];

this.cities = [
  {name: 'New York', code: 'NY'},
  {name: 'Rome', code: 'RM'},
  {name: 'London', code: 'LDN'},
  {name: 'Istanbul', code: 'IST'},
  {name: 'Paris', code: 'PRS'}
];

this.stackedOptions = {
  tooltips: {
      mode: 'index',
      intersect: false
  },
  responsive: true,
  scales: {
      xAxes: [{
          stacked: true,
      }],
      yAxes: [{
          stacked: true
      }]
  }
};

  }


  toggleDetailVisibility() {
    this.isDetailVisible = !this.isDetailVisible;
    if (this.isDetailVisible) {
      setTimeout(() => {
        this.scrollChildrenComponentIntoView();
      }, 0);
    }
  }
  
scrollChildrenComponentIntoView() {
  this.viewportScroller.scrollToAnchor('children-component');
}

  goToPage(pageName: string) {
  
    this.router.navigate([`${pageName}`]);
    
  }


  //===========================
 updateChartOptions11() {
    this.chartOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme();
}

getLightTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    }
}

getDarkTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        }
    }
}


  //=============================

  getDashBoardData() {
    this.currentUser.id = this.storageService.getUser().id;
    this.currentUser.category = this.storageService.getUser().category;
    this.auditorDashboardService.getDashboardData(this.currentUser).subscribe(
      
      (response) => {
        console.log("responce issssssssssssss component"+ response);
        
        // this.loading = true;
        this.auditorDashboardData = response;
        this.getPolarChartData(this.auditorDashboardData.polar_data);
        this.getAuditsPerDirectorate(
          this.auditorDashboardData.directorates,
          this.auditorDashboardData.finding_status
        );
        this.getFindingStatusPerMonthStackedBarChart(
          this.auditorDashboardData.stacked_bar_chart_data
        );
        this.getFindingStatusPerMonthBarChart(
          this.auditorDashboardData.bar_chart_data
        );
        this.getDoughnutData(this.auditorDashboardData.doughnut_data);

        this.getLineChartData(this.auditorDashboardData.line_chart_data);

        this.getTotalFindingStatusPerMonthHorizontalBarChart(
          this.auditorDashboardData.horizontal_bar_chart_data
        );
        this.getRadarData(this.auditorDashboardData.age_data);
      },
      
      (error) => (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while fetching findings!',
          detail: '',
        });
      }
    );
  }

  getAuditsPerDirectorate(directorates: String[], finding_status: Number[]) {
    let approved_audits = [],
      responded_audits = [],
      partially_rectified_audits = [],
      passed_audits = [],
      reviewed_audits = [],
      rectified_audits = [];

    for (let index = -1; index < finding_status.length; ) {
      passed_audits.push(finding_status[++index]);
      reviewed_audits.push(finding_status[++index]);
      approved_audits.push(finding_status[++index]);
      responded_audits.push(finding_status[++index]);
      partially_rectified_audits.push(finding_status[++index]);
      rectified_audits.push(finding_status[++index]);
    }

    this.auditsPerDirectorateData = {
      labels: directorates,
      datasets: [
        {
          label: 'Passed',
          data: passed_audits,
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          backgroundColor: '#95A5A6',
          borderColor: '#95A5A6',
        },
        {
          label: 'Reviewed',
          data: reviewed_audits,
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          backgroundColor: '#36A2EB',
          borderColor: '#36A2EB',
        },
        {
          label: 'Approved',
          data: approved_audits,
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          backgroundColor: '#48C9B0',
          borderColor: '#48C9B0',
        },
        {
          label: 'Responded',
          data: responded_audits,
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          backgroundColor: '#2874A6',
          borderColor: '#2874A6',
        },
        {
          label: 'Partially Rectified',
          data: partially_rectified_audits,
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          backgroundColor: '#C8FE2E',
          borderColor: '#C8FE2E',
        },
        {
          label: 'Rectified',
          data: rectified_audits,
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          backgroundColor: '#28B463',
          borderColor: '#28B463',
        },
      ],
    };
  }

  getFindingStatusPerMonthStackedBarChart(stacked_bar_chart_data: Number[]) {
    let total_responded_audits = [],
      total_approved_audits = [],
      total_approver_rejected_audits = [];

    for (let index = -1; index < stacked_bar_chart_data.length; ) {
      total_approved_audits.push(stacked_bar_chart_data[++index]);
      total_approver_rejected_audits.push(stacked_bar_chart_data[++index]);
      total_responded_audits.push(stacked_bar_chart_data[++index]);
    }
    this.stackedDataBarChartFindingStatus = {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          type: 'bar',
          label: 'Approved',
          backgroundColor: '#48C9B0',
          data: total_approved_audits,
        },
        {
          type: 'bar',
          label: 'Approver Rejected',
          backgroundColor: '#F8C471',
          data: total_approver_rejected_audits,
        },
        {
          type: 'bar',
          label: 'Responded',
          backgroundColor: '#2874A6',
          data: total_responded_audits,
        },
      ],
    };
  }

  getTotalFindingStatusPerMonthHorizontalBarChart(
    horizontal_bar_chart_data: Number[]
  ) {
    let total_drafted_audits = [],
      total_passed_audits = [],
      total_reviewer_rejected_audits = [],
      total_reviewed_audits = [];

    for (let index = -1; index < horizontal_bar_chart_data.length; ) {
      total_drafted_audits.push(horizontal_bar_chart_data[++index]);
      total_passed_audits.push(horizontal_bar_chart_data[++index]);
      total_reviewer_rejected_audits.push(horizontal_bar_chart_data[++index]);
      total_reviewed_audits.push(horizontal_bar_chart_data[++index]);
    }
    this.horizontal_bar_chart_data = {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          type: 'bar',
          label: ' Drafted',
          backgroundColor: '#CCD1D1',
          data: total_drafted_audits,
        },

        {
          type: 'bar',
          label: 'Passed',
          backgroundColor: '#839192',
          data: total_passed_audits,
        },
        {
          type: 'bar',
          label: 'Reviewer Rejected',
          backgroundColor: '#FAD7A0',
          data: total_reviewer_rejected_audits,
        },
        {
          type: 'bar',
          label: 'Reviewed',
          backgroundColor: '#36A2EB',
          data: total_reviewed_audits,
        },
      ],
    };
  }

  getPolarChartData(polar_data: Number[]) {
    this.polarChartFindingStatusData = {
      datasets: [
        {
          data: polar_data,
          backgroundColor: [
            '#48C9B0',
            '#F8C471',
            '#2874A6',
            '#28B463',
            '#FA8072',
          ],
          hoverBackgroundColor: [
            '#F5B041',
            '#154360',
            '#F5B041',
            '#28B463',
            '#F5B041',
          ],
          label: 'Current Finding Status Statistics',
        },
      ],
      labels: [
        'Approved',
        'Approver Rejected',
        'Responded',
        'Rectified',
        'Unrectified',
      ],
    };
  }

  getDoughnutData(doughnut_data: Number[]) {
    this.doughnut_data = {
      labels: [
        'Followup Rejected',
        'Partialy Rectified',
        'Approved',
        'Responded',
        'Rectified',
      ],
      datasets: [
        {
          data: doughnut_data,
          backgroundColor: [
            '#F5A9BC',
            '#C8FE2E',
            '#48C9B0',
            '#2874A6',
            '#28B463',
          ],
          hoverBackgroundColor: [
            '#F5A9BC',
            '#154360',
            '#F5B041',
            '#154360',
            '#F5B041',
          ],
        },
      ],
    };
  }

  getFindingStatusPerMonthBarChart(bar_chart_data: Number[]) {
    let approved_audits = [],
      approver_rejected_audits = [],
      rectified_audits = [],
      unrectified_audits = [];

    for (let index = -1; index < bar_chart_data.length; ) {
      approved_audits.push(bar_chart_data[++index]);
      approver_rejected_audits.push(bar_chart_data[++index]);
      rectified_audits.push(bar_chart_data[++index]);
      unrectified_audits.push(bar_chart_data[++index]);
    }
    this.DataBarChartFindingStatus = {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          type: 'bar',
          label: 'Approved ',
          backgroundColor: '#48C9B0',
          data: approved_audits,
        },
        {
          type: 'bar',
          label: 'Approver Rejected',
          backgroundColor: '#F8C471',
          data: approver_rejected_audits,
        },
        {
          type: 'bar',
          label: 'Rectified',
          backgroundColor: '#28B463',
          data: rectified_audits,
        },
        {
          type: 'bar',
          label: 'Unrectified',
          backgroundColor: '#FA8072',
          data: unrectified_audits,
        },
      ],
    };
  }

  getLineChartData(line_chart_data: Number[]) {
    let drafted_audits = [],
      passed_audits = [],
      reviewer_rejected_audits = [],
      reviewed_audits = [];

    for (let index = -1; index < line_chart_data.length; ) {
      drafted_audits.push(line_chart_data[++index]);
      passed_audits.push(line_chart_data[++index]);
      reviewer_rejected_audits.push(line_chart_data[++index]);
      reviewed_audits.push(line_chart_data[++index]);
    }

    this.line_chart_data = {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          label: 'Drafted',
          data: drafted_audits,
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: '#CCD1D1',
          backgroundColor: '#CCD1D1',
        },
        {
          label: 'Passed',
          data: passed_audits,
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: '#95A5A6',
          backgroundColor: '#95A5A6',
        },
        {
          label: 'Reviewer Rejected',
          data: reviewer_rejected_audits,
          fill: false,
          borderDash: [5, 5],
          borderColor: '#FAD7A0',
          tension: 0.4,
          backgroundColor: '#FAD7A0',
        },
        {
          label: 'Reviewed',
          data: reviewed_audits,
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: '#36A2EB',
          backgroundColor: '#36A2EB',
        },
      ],
    };
  }

  getRadarData(age_data: Number[]) {
    let approved_data = [];
    let passed_data = [];

    for (let index = -1; index < age_data.length; ) {
      passed_data.push(age_data[++index]);
      approved_data.push(age_data[++index]);
    }

    this.radar_data = {
      labels: ['10 days', '20 days', '30 days', '40 days', 'above 40 days'],
      datasets: [
        {
          label: 'Review',
          backgroundColor: 'rgba(26, 188, 156 ,0.2)',
          borderColor: 'rgba(26, 188, 156 , 1)',
          pointBackgroundColor: 'rgba(26, 188, 156 , 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(26, 188, 156 , 1)',
          data: passed_data,
        },
        {
          label: 'Response',
          backgroundColor: 'rgba(26, 82, 118,0.2)',
          borderColor: 'rgba(26, 82, 118,1)',
          pointBackgroundColor: 'rgba(26, 82, 118,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(26, 82, 118,1)',
          data: approved_data,
        },
      ],
    };
  }
}
