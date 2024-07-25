import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/services/shared/storage.service';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-rprpf-five',
  templateUrl: './rprpf-five.component.html',
  styleUrls: ['./rprpf-five.component.css'],
})
export class RprpfFiveComponent implements OnInit {
  dashboard_response_data: any;
  auditor: boolean;

  constructor(
    private dashboardService: DashboardService,
    public storageService: StorageService
  ) {
    this.auditor =
      Array.from(this.storageService.getUser().roles).includes(
        'ROLE_AUDITOR_BFA'
      ) ||
      Array.from(this.storageService.getUser().roles).includes('ROLE_BRANCHM_BFA');
    console.log('aaaaaaaaaaaaaaaaaaaaaaaa: ' + this.auditor);
    console.log(
      'adsf;lkj: ' +
        JSON.stringify(this.storageService.getUser().roles) +
        ' : ' +
        Array.from(this.storageService.getUser().roles).includes('ROLE_AUDITOR_BFA')
    );
    console.log('true: ' + this.auditor)
  }

  ngOnInit() {
    console.log('here we go');
    console.log(
      'olla' + JSON.stringify(this.storageService.getUser(), null, 4)
    );

    this.getDashboardDataFive();
  }

  getDashboardDataFive() {
    this.dashboardService.fetchDashboardDataFive().subscribe(
      (data: any) => {
        console.log('dashboard data00111: ' + JSON.stringify(data, null, 4));
        this.dashboard_response_data = data;
      },
      (error: any) => {
        console.error('dashboard error: ' + JSON.stringify(error, null, 4));
      }
    );
  }
}
