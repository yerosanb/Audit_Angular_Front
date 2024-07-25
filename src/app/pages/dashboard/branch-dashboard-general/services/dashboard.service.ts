import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportResponse } from 'app/branch_audit/report/payloads/ReportResponse';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch/dashboard/';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  fetchDashboardData(): Observable<any> {
    let user = this.storageService.getUser();
    console.log('user info: ' + JSON.stringify(user, null, 4));

    const user_info = {
      user_id: user.id,
      user_roles: user.roles,
      user_region_id: user.region == null ? user.branch.id : user.region.id,
    };
    return this.httpClient.post<any>(baseUrl + 'fetchDashboard', user_info);
  }

  fetchDashboardDataOne() {
    let user = this.storageService.getUser();
    console.log('user info: ' + JSON.stringify(user, null, 4));
    const user_info = {
      user_id: user.id,
      user_roles: user.roles,
      user_region_id: user.region == null ? user.branch.id : user.region.id,
    };
    return this.httpClient.post<any>(baseUrl + 'fetchDashboardOne', user_info);
  }

  fetchDashboardDataTwo() {
    let user = this.storageService.getUser();
    console.log('user info: ' + JSON.stringify(user, null, 4));
    const user_info = {
      user_id: user.id,
      user_roles: user.roles,
      user_region_id: user.region == null ? user.branch.id : user.region.id,
    };
    return this.httpClient.post<any>(baseUrl + 'fetchDashboardTwo', user_info);
  }

  fetchDashboardDataThree() {
    let user = this.storageService.getUser();
    console.log('user info: ' + JSON.stringify(user, null, 4));
    const user_info = {
      user_id: user.id,
      user_roles: user.roles,
      user_region_id: user.region == null ? user.branch.id : user.region.id,
    };
    return this.httpClient.post<any>(
      baseUrl + 'fetchDashboardThree',
      user_info
    );
  }

  fetchDashboardDataFour() {
    let user = this.storageService.getUser();
    console.log('user info: ' + JSON.stringify(user, null, 4));
    const user_info = {
      user_id: user.id,
      user_roles: user.roles,
      user_region_id: user.region == null ? user.branch.id : user.region.id,
    };
    return this.httpClient.post<any>(baseUrl + 'fetchDashboardFour', user_info);
  }

  fetchDashboardDataFive() {
    let user = this.storageService.getUser();
    console.log('user info: ' + JSON.stringify(user, null, 4));
    const user_info = {
      user_id: user.id,
      user_roles: user.roles,
      user_region_id: user.region == null ? user.branch.id : user.region.id,
    };
    return this.httpClient.post<any>(baseUrl + 'fetchDashboardFive', user_info);
  }
}
