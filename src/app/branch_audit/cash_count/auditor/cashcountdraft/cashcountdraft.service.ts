import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch_audit/auditor/cash_count/';

@Injectable({
  providedIn: 'root'
})
export class CashcountdraftService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getCashCount(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(baseUrl + 'getCashCount/' + `${id}`);
  }

  saveCashCount(audit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + 'create', audit);
  }

  getAuditsOnDrafting(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>( baseUrl + 'getAuditsOnDrafting/' + `${id}`);
  }

  deleteSelectedCashCount(audit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + 'delete/selected', audit);
  }

  passSelectedCashCount(audit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + 'pass/selected', audit);
  }

  deleteCashCount(id: any): Observable<any> {
    return this.httpClient.delete<any>(baseUrl + 'delete/' + `${id}`);
  }

  passCashCount(id: any): Observable<any> {
    return this.httpClient.get<any>(baseUrl + 'pass/' + `${id}`);
  }

}
