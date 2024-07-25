import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { CommonFinding } from 'app/models/shared/audit/common-finding';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch_audit/auditor/loan-and-advance/';

@Injectable({
  providedIn: 'root'
})
export class LoanAndAdvanceAuditorService {

  constructor(private httpClient: HttpClient) {}
  getAuditsOnProgressForAuditor(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + 'progress/' + `${id}`);
  }
  getCommonFindings(): Observable<any> {
    return this.httpClient.get<CommonFinding[]>(baseUrl + '/finding' );
  }
  getRecommondations(): Observable<any> {
    return this.httpClient.get(`${baseUrl}/approver/recommendation`);
  }
  deleteSelectedLoanAndAdvance(audit_ISMs: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + 'delete/selected', audit_ISMs);
  }
  passSelectedLoanAndAdvance(audit_ISMs: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + 'pass/selected', audit_ISMs);
  }
  createLoanAndAdvance(audit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + 'create', audit);
  }
  getLoanAndAdvanceOnDraft(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>( baseUrl + 'drafted/' + `${id}`);
  }
  passSingleLoanAndAdvance(id: any): Observable<any> {
    return this.httpClient.get<any>(baseUrl + 'pass/' + `${id}`);
  }
  deleteSingleLoanAndAdvance(id: any): Observable<any> {
    return this.httpClient.delete<any>(baseUrl + 'delete/' + `${id}`);
  }

  getPassedAudits(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(baseUrl + 'passed/' + `${id}`);
  }
  backSelectedAudits(audit_ISMs: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + 'back/selected', audit_ISMs);
  }
  backAudit(id: any): Observable<any> {
    return this.httpClient.get<any>(baseUrl + 'back/' + `${id}`);
  }


}
