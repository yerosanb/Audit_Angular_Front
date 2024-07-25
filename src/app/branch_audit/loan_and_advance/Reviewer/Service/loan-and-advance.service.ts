import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch_audit/reviewer/loan-and-advance/';


@Injectable({
  providedIn: 'root'
})
export class LoanAndAdvanceService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getReviewedLoanAndAdvance(reviewer_id: number): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(baseUrl + 'reviewed/' + `${reviewer_id}` );
  }

  getAuditsForReviewer(user: any): Observable<any> {
    return this.httpClient.post(baseUrl + 'pending', user);
  }


}
