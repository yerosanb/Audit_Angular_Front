
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { CompiledRegionalAudit } from 'app/branch_audit/model/compiled-regional-audit';
const baseUrl = environment.backendUrl + '/branch_audit/approver/';

@Injectable({
  providedIn: 'root',
})
export class ApproverBranchService {
  constructor(private httpClient: HttpClient) {}

  getPendingAudits(category: any): Observable<any> {
    return this.httpClient.get<CompiledRegionalAudit[]>(
      baseUrl + 'pending/' + `${category}`
    );
  }


  approveAudit(audit: CompiledRegionalAudit[]) {
    return this.httpClient.put(baseUrl + 'approve', audit);
  }

  addToDrafting(audit: CompiledRegionalAudit[]) {
    return this.httpClient.put(baseUrl + 'draft', audit);
  }


  updateFinding(audit: CompiledRegionalAudit) {
    return this.httpClient.put(baseUrl + 'update', audit);
  }


  unapproveAudit(audit: CompiledRegionalAudit[]) {
    return this.httpClient.put(baseUrl + 'unapprove', audit);
  }

  closeAudit(audit: CompiledRegionalAudit[]) {
    return this.httpClient.post(baseUrl + 'close', audit);
  }


  getApprovedAudits(approver_id: any): Observable<any> {
    return this.httpClient.get<CompiledRegionalAudit[]>(
      baseUrl + 'approved/' + `${approver_id}`
    );
  }


  getDraftedAudits(approver_id: any): Observable<any> {
    return this.httpClient.get<CompiledRegionalAudit[]>(
      baseUrl + 'drafted/' + `${approver_id}`
    );
  }



  getRejectedAudits(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + 'rejected/' + `${id}`
    );
  }

  getApprovedAuditsStatus(approver_id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + 'approvedStatus/' + `${approver_id}`
    );
  }

  cancelSelectedfindings(audit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.put(baseUrl + 'cancel/selected', audit);
  }

  cancelFinding(remark: RemarkBranchAudit): Observable<any> {
    return this.httpClient.put(baseUrl + 'reject', remark);
  }
}
