import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch_audit/reviewer/status_of_audit/';

@Injectable({
  providedIn: 'root'
})
export class StatusofauditunreviewService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  getReviewedStatusOfAudit(reviewer_id: number): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(baseUrl + 'reviewed/' + `${reviewer_id}`);
  }

  unReviewSelectedStatusOfAudit(audit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.put(baseUrl + 'unreview/selected', audit);
  }

  unReviewStatusOfAudit(audit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.put(baseUrl + 'unreview',audit);
  }

}
