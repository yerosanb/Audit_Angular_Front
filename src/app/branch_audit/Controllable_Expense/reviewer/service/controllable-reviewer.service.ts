import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl =
  environment.backendUrl + '/branch_audit/reviewer/controllable_expense';

@Injectable({
  providedIn: 'root',
})
export class ControllableReviewerService {
  constructor(private httpClient: HttpClient) {}

  getPendingAudits(user: any): Observable<any> {
    return this.httpClient.post(baseUrl + '/pending', user);
  }

  getReviewedFindings(reviewer_id: number): Observable<any> {
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
