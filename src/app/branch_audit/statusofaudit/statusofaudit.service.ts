import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
import { BranchFinancialAudit } from '../model/branch-financial-audit';
import { Statusofaudit } from '../model/statusofaudit';
const baseUrl = environment.backendUrl + '/branch_audit/auditor/status_of_audit/';

@Injectable({
  providedIn: 'root'
})
export class StatusofauditService {

  constructor(private httpClient: HttpClient) { }

  getStatusOfAudit(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(baseUrl + 'getStatusOfAudit/' + `${id}` );
  }

  saveStatusOfAudit(audit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + 'saveStatusOfAudit', audit);
  }


  deleteStatusOfAudit(id: any): Observable<any> {
    return this.httpClient.delete<any>(baseUrl + 'deleteStatusOfAudit/' + `${id}`);
  }

  deleteSelecteStatusofdAudits(audit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + 'deleteSelecteStatusofdAudits', audit);
  }

  passSelecteStatusOfdAudits(audit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + 'pass/selected', audit);
  }

  passStatusOfAudit(id: any): Observable<any> {
    return this.httpClient.get<any>(baseUrl + 'pass/' + `${id}`);
  }


}
