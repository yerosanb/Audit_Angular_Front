import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/models/admin/user';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch_audit/audit_notification/';

@Injectable({
  providedIn: 'root',
})
export class BranchAuditNotificationServiceService {
  constructor(private httpClient: HttpClient) {}

  get_notification_r_m(user: User): Observable<any> {
    return this.httpClient.post(baseUrl + 'notification_r_m', user);
  }
  get_notification_compiler(user: User): Observable<any> {
    return this.httpClient.post(baseUrl + 'notification_compiler', user);
  }
  getBranchRemarkAuditsNotification(user: User): Observable<any> {
    return this.httpClient.post(baseUrl + 'remark_notification', user);
  }

}


