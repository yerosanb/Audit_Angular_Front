
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch_audit/rectification_tracker/';


@Injectable({
  providedIn: 'root',
})
export class RectificationTrackerService {
  constructor(private httpClient: HttpClient) {}


  getFiles(): Observable<any> {
    return this.httpClient.get(`${baseUrl}/files`);
  }

  getFilesByFileName(uploaded_files: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/files`, uploaded_files);
  }

  seenAudits(audits: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + 'seenRectifiedAudits', audits);
  }

  getUnseenRectificationsAudits(audit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + 'unseenRectifiedAudits', audit);
  }



  rectify_auditee_response(auditee_response: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/rectify', auditee_response);
  }

}
