import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControllableExpenseType } from 'app/branch_audit/model/ControllableExpense/controllable-expense-type';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl =
  environment.backendUrl + '/branch_audit/auditor/controllable_expense';

@Injectable({
  providedIn: 'root',
})
export class ControllableExpenseService {
  constructor(private httpClient: HttpClient) {}

  create_audit(audit: ControllableExpenseType): Observable<any> {
    return this.httpClient.post(baseUrl + '/create', audit);
  }

  getDrafting(): Observable<any> {
    return this.httpClient.get<ControllableExpenseType[]>(
      baseUrl + '/drafting'
    );
  }

  getControllableExpenseType(): Observable<any> {
    return this.httpClient.get<ControllableExpenseType[]>(
      baseUrl + '/controllable_type'
    );
  }
  getAuditsOnProgressForAuditor(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/progress/' + `${id}`
    );
  }

  getAuditById(id: any): Observable<any> {
    return this.httpClient.get<any>(baseUrl + 'get/' + `${id}`);
  }

  deleteAudits(id: any): Observable<any> {
    return this.httpClient.delete<any>(baseUrl + '/delete/' + `${id}`);
  }

  deleteSelectedAudits(audit_ISMs: ControllableExpenseType[]): Observable<any> {
    return this.httpClient.post(baseUrl + 'delete/selected', audit_ISMs);
  }

  ////////////////////////////////////////////////

  createSuspenseAccount(
    branchFinancialAudit: BranchFinancialAudit
  ): Observable<any> {
    return this.httpClient.post(baseUrl + '/createAll', branchFinancialAudit);
  }

  getDraftedSuspenseAccount(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/drafted/' + `${id}`
    );
  }
  getPassedSuspenseAccount(id: any): Observable<any> {
    return this.httpClient.get<[BranchFinancialAudit]>(
      baseUrl + '/passed/' + `${id}`
    );
  }
  getOnProgressSuspenseAccount(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/progress/' + `${id}`
    );
  }

  passSuspenseAccount(
    branchFinancialAudit: BranchFinancialAudit
  ): Observable<any> {
    return this.httpClient.post(baseUrl + '/pass', branchFinancialAudit);
  }
  passSelectedSuspenseAccount(
    branchFinancialAudit: BranchFinancialAudit[]
  ): Observable<any> {
    return this.httpClient.post(
      baseUrl + '/pass/selected',
      branchFinancialAudit
    );
  }

  backPassedSuspenseAccount(
    branchFinancialAudit: BranchFinancialAudit
  ): Observable<any> {
    return this.httpClient.post(baseUrl + '/back', branchFinancialAudit);
  }

  deleteSuspenseAccount(
    branchFinancialAudit: BranchFinancialAudit
  ): Observable<any> {
    return this.httpClient.post(baseUrl + '/delete', branchFinancialAudit);
  }

  backSelectedPassedSuspenseAccount(
    branchFinancialAudit: BranchFinancialAudit[]
  ): Observable<any> {
    return this.httpClient.post(
      baseUrl + '/back/selected',
      branchFinancialAudit
    );
  }

  deleteSelectedSuspenseAccount(
    branchFinancialAudit: BranchFinancialAudit[]
  ): Observable<any> {
    return this.httpClient.post(
      baseUrl + '/delete/selected',
      branchFinancialAudit
    );
  }
}
