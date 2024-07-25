
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { CompiledBranchAudit } from 'app/branch_audit/model/compiled-branch-audit';
const baseUrl = environment.backendUrl + '/branch_audit/reviewer/common/';

@Injectable({
  providedIn: 'root',
})
export class CommonReviewerBranchFinancialService {
  constructor(private httpClient: HttpClient) {}

  getCompiledFindings(reviewer_id: number): Observable<any> {
    return this.httpClient.get<CompiledBranchAudit[]>(
      baseUrl + 'compiled/' + `${reviewer_id}`
    );
  }

  compileFindings(audit: CompiledBranchAudit): Observable<any> {
    return this.httpClient.put(baseUrl + 'compile', audit);
  }

  getReviewedFindingsStatus(reviewer_id: number): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + 'reviewedStatus/' + `${reviewer_id}`
    );
  }

  reviewFindings(audit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.put(baseUrl + 'review', audit);
  }

  reviewMultiAuditfinding(audit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.put(baseUrl + 'review/selected', audit);
  }

  cancelFinding(remark: RemarkBranchAudit): Observable<any> {
    return this.httpClient.put(baseUrl + 'cancel', remark);
  }

  cancelSelectedFindings(audit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.put(baseUrl + 'cancel/selected', audit);
  }

  unReviewMultiAuditfinding(audit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.put(baseUrl + 'unreview/selected', audit);
  }

  unReviewAuditFindings(audit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.put(baseUrl + 'unreview', audit);
  }
}
