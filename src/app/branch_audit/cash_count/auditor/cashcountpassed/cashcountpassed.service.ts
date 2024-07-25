import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch_audit/auditor/cash_count/';

@Injectable({
  providedIn: 'root'
})
export class CashcountpassedService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getCashCount(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(baseUrl + 'passed/' + `${id}`);
  }

  backSelectedCashCount(audit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + 'back/selected', audit);
  }

  backPassedCashCount(id: any): Observable<any> {
    return this.httpClient.get<any>(baseUrl + 'back/' + `${id}`);
  }

}
