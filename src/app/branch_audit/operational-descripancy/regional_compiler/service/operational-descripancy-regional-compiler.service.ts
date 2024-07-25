import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
import { CompiledBranchAudit } from 'app/branch_audit/model/compiled-branch-audit';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
const baseUrl =
  environment.backendUrl +
  '/branch_audit/regional_compiler/operational_discrepancy/';

@Injectable({
  providedIn: 'root',
})
export class OperationalDescripancyRegionalCompilerService {
  constructor(private httpClient: HttpClient) {}

  getPendingAudits(reviewer: any): Observable<any> {
    return this.httpClient.post(baseUrl + 'pending/', reviewer);
  }

  getReviewedFindings(parameters: any[]): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + 'reviewed/' + `${parameters}`
    );
  }

  getCompiledFindings(reviewer_id: number): Observable<any> {
    return this.httpClient.get<CompiledBranchAudit[]>(
      baseUrl + 'compiled/' + `${reviewer_id}`
    );
  }

  compileFindings(audit: CompiledBranchAudit): Observable<any> {
    return this.httpClient.put(baseUrl + 'compile', audit);
  }

  getRejectedFindings(reviewer_id: number): Observable<any> {
    return this.httpClient.get<CompiledBranchAudit[]>(
      baseUrl + 'rejected/' + `${reviewer_id}`
    );
  }

  getReviewedFindingsStatus(reviewer_id: number): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + 'reviewedStatus/' + `${reviewer_id}`
    );
  }
}
