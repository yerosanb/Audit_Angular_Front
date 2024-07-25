import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl =
  environment.backendUrl + '/branch_audit/reviewer/cash_management';

@Injectable({
  providedIn: 'root',
})
export class CashManagementBranchService {
  constructor(private httpClient: HttpClient) {}

  getAuditsForReviewers(user: any): Observable<any> {
    return this.httpClient.post(baseUrl + '/pending', user);
  }

  getReviewedFindingforcash(reviewer_id: number): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/reviewed/' + `${reviewer_id}`
    );
  }

  getRejectedFindings(reviewer_id: number): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/rejected/' + `${reviewer_id}`
    );
  }

  getReviewedFindingsStatus(reviewer_id: number): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/reviewedStatus/' + `${reviewer_id}`
    );
  }
}
