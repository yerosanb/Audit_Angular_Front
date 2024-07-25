import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Audit_ISM } from 'app/models/auditor/audit_ISM';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/mgt_report';

@Injectable({
  providedIn: 'root'
})
export class MgtReportService {

  constructor(private http: HttpClient) { }

  getMgt_Report(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/search`, data);
  }

  getIS_Mgt_Report(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/search`, data);
  }

 getDivisionsByDirectorateID(directorate_id: any): Observable<any> {
    return this.http.get(`${baseUrl}/division/${directorate_id}`);
  }
}
