import { Component, OnInit } from '@angular/core';

import { StorageService } from 'app/services/shared/storage.service';
 //import { MessageService } from 'primeng/api/messageservice';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardService } from '../branch-dashboard-general/services/dashboard.service';
//import {MenuItem} from 'primeng/api';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-approver-dashboard',
  templateUrl: './approver-dashboard.component.html',
  styleUrls: ['./approver-dashboard.component.css'],
})
export class ApproverDashboardComponent implements OnInit {
  isLoggedIn = false;
  loading = true;
  dashboard_response_data: any;
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

  data: any;

  options: any;

  events: any[];

  ngOnInit() {
    this.getDashboardData();
    {
      this.events = [
        {
          status:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha.',
          date: '15/10/2020 10:30',
          icon: 'pi pi-shopping-cart',
          color: '#9C27B0',
          image: 'game-controller.jpg',
        },
        {
          status:
            'It is a long established fact that a reader will be distracted',
          date: '15/10/2020 16:15',
          icon: 'pi pi-shopping-cart',
          color: '#FF9800',
        },
        {
          status:
            'Lorem Ipsum is simply dummy text of the printing and typesetting indust.',
          date: '15/10/2020 10:30',
          icon: 'pi pi-shopping-cart',
          color: '#9C27B0',
          image: 'game-controller.jpg',
        },
        {
          status: 'There are many variati.',
          date: '16/10/2020 10:00',
          icon: 'pi pi-check',
          color: '#607D8B',
        },
        {
          status:
            'Contrary to popular belief, Lorem Ipsum is  over 2000 years old. Richard McClintock',
          date: '15/10/2020 14:00',
          icon: 'pi pi-cog',
          color: '#673AB7',
        },
      ];
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.data = {
        datasets: [
          {
            data: [5, 12, 9, 4, 15, 7, 10, 3, 8, 13, 6, 11, 14, 6, 9, 12, 7],
            backgroundColor: [
              documentStyle.getPropertyValue('--red-500'),
              documentStyle.getPropertyValue('--green-500'),
              documentStyle.getPropertyValue('--yellow-500'),
              documentStyle.getPropertyValue('--bluegray-500'),
              documentStyle.getPropertyValue('--blue-500'),
            ],
            label: 'Stat 1',
          },
        ],
        labels: [
          'Metric 1',
          'Metric 2',
          'Metric 3',
          'Metric 4',
          'Metric 5',
          'Metric 6',
          'Metric 7',
          'Metric 8',
          'Metric 9',
          'Metric 10',
          'Metric 11',
          'Metric 12',
          'Metric 13',
          'Metric 14',
          'Metric 15',
          'Metric 16',
          'Metric 17',
        ],
      };

      this.options = {
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          r: {
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };

      this.isLoggedIn = this.storageService.isLoggedIn();
      if (this.isLoggedIn) {
        // setTimeout(() => {
        this.loading = true;
        // }, 4000);
      }
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
