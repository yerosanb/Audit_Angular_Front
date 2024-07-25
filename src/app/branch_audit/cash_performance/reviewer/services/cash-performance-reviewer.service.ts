import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch/reviewer/cash_performance';

@Injectable({
  providedIn: 'root',
})
export class CashPerformanceReviewerService {
  constructor(private httpClient: HttpClient) {}

  getReviewedAudits(reviewer_id: number): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/reviewed/' + `${reviewer_id}`
    );
  }

  getPendingAudits(user: any): Observable<any> {
    return this.httpClient.post(baseUrl + '/pending', user);
  }
}
