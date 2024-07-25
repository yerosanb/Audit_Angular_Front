import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch_audit/reviewer/atm/';

@Injectable({
  providedIn: 'root',
})
export class ATMCardReviewerService {
  constructor(private httpClient: HttpClient) {}

  getPendingAudits(user: any): Observable<any> {
    return this.httpClient.post(baseUrl + 'pending', user);
  }

  getReviewedFindings(reviewer_id: number): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + 'reviewed/' + `${reviewer_id}`
    );
  }
}
