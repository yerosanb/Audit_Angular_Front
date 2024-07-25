import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { User } from 'app/models/admin/user';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch_audit/auditor/dormant_account';

@Injectable({
  providedIn: 'root'
})
export class DormantInactiveAccountAuditorBranchService {

  constructor(private httpClient: HttpClient) {}

  create_audit(audit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/create', audit);
  }

  getPassedAudit(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/passedAccount/' + `${id}`
    );
  }

  getDrafting(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/draft/' + `${id}`
    );
  }
  getAuditsOnProgressForAuditor(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + 'progress/' + `${id}`
    );
  }

  getAuditById(id: any): Observable<any> {
    return this.httpClient.get<any>(baseUrl + 'get/' + `${id}`);
  }

  deleteAudits(id: any): Observable<any> {
    return this.httpClient.delete<any>(baseUrl + '/delete/' + `${id}`);
  }

  deleteSelectedAudits(audit_ISMs: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/delete/selected', audit_ISMs);
  }

  passAudits(id: any): Observable<any> {
    return this.httpClient.get<any>(baseUrl + '/pass/' + `${id}`);
  }

  getAuditFindings(): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/ism'
    );
  }
  passSelectedAudits(audit_ISMs: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/pass/selected', audit_ISMs);
  }

  backAudits(id: any): Observable<any> {
    return this.httpClient.get<any>(baseUrl + '/back/' + `${id}`);
  }

  backSelectedAudits(audit_ISMs: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/back/selected', audit_ISMs);
  }

  changeRecitificationStatus(audit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.put(baseUrl + '/ism', audit);
  }

  getDashboardData(user: User): Observable<any> {
    return this.httpClient.post(baseUrl + 'auditor/dashboard', user);
  }
}
