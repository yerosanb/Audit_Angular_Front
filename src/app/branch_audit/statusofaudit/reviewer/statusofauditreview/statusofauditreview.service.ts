import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch_audit/reviewer/status_of_audit/';

@Injectable({
  providedIn: 'root'
})
export class StatusofauditreviewService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  getPendingStatusOfAudit(user: any): Observable<any> {
    return this.httpClient.post(baseUrl + 'pending', user);
  }

  reviewSelectedStatusOfAudit(audit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.put(baseUrl + 'review/selected', audit);
  }

  reviewStatusOfAudit(audit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.put(baseUrl + 'review', audit);
  }


}
