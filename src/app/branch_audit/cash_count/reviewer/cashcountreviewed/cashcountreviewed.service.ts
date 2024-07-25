import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch_audit/reviewer/cash_count/';

@Injectable({
  providedIn: 'root'
})
export class CashcountreviewedService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getReviewedCashCount(reviewer_id: number): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(baseUrl + 'reviewed/' + `${reviewer_id}`);
  }




}
