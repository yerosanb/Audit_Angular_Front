import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl =
  environment.backendUrl + '/branch_audit/auditor/cash_management';

@Injectable({
  providedIn: 'root',
})
export class AuditorCashManagementBranchService {
  constructor(private httpClient: HttpClient) {}

  create_audit(audit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/create', audit);
  }

  getPassedCashManagementAudits(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/passed/' + `${id}`
    );
  }

  getDraftingCashManagementAudits(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/drafted/' + `${id}`
    );
  }


}
