
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { CompiledBranchAudit } from 'app/branch_audit/model/compiled-branch-audit';
const baseUrl = environment.backendUrl + '/branch_audit/division/';

@Injectable({
  providedIn: 'root',
})
export class DivisionCompilerService {
  constructor(private httpClient: HttpClient) { }

  getPendingAudits(category: any[]): Observable<any> {
    return this.httpClient.get<CompiledBranchAudit[]>(
      baseUrl + 'pending/' + `${category}`
    );
  }

  getReviewedFindings(parameters: any[]): Observable<any> {
    return this.httpClient.get<CompiledBranchAudit[]>(
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
    return this.httpClient.get<CompiledBranchAudit[]>(
      baseUrl + 'reviewedStatus/' + `${reviewer_id}`
    );
  }

  reviewFinding(audit: CompiledBranchAudit[]): Observable<any> {
    return this.httpClient.put(baseUrl + 'review', audit);
  }

  cancelFinding(remark: RemarkBranchAudit): Observable<any> {
    return this.httpClient.put(baseUrl + 'cancel', remark);
  }

  cancelSelectedFindings(audit: CompiledBranchAudit[]): Observable<any> {
    return this.httpClient.put(baseUrl + 'cancel/selected', audit);
  }

  unreviewFinding(audit: CompiledBranchAudit[]): Observable<any> {
    return this.httpClient.put(baseUrl + 'unreview', audit);
  }
}


