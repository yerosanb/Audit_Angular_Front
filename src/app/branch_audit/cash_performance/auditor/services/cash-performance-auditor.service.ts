import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch/auditor/cash_performance';

@Injectable({
  providedIn: 'root',
})
export class CashPerformanceAuditorService {
  constructor(private httpClient: HttpClient) {}

  create(audit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/create', audit);
  }

  getPassedCashPerformance(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/passed/' + `${id}`
    );
  }

  getDraftedCashPerformance(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/drafted/' + `${id}`
    );
  }
}
