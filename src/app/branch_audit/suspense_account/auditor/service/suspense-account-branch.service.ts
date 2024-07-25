
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch/auditor/suspense_account_branch';

@Injectable({
  providedIn: 'root'
})
export class SuspenseAccountBranchService {


  constructor(private httpClient: HttpClient) { }

  
  createSuspenseAccount(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/create', branchFinancialAudit);
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


  passSuspenseAccount(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/pass', branchFinancialAudit);
  }
  passSelectedSuspenseAccount(branchFinancialAudit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/pass/selected', branchFinancialAudit);
  }

  backPassedSuspenseAccount(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post( baseUrl + '/back' ,branchFinancialAudit);
  }

  deleteSuspenseAccount(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/delete', branchFinancialAudit);
  }

  backSelectedPassedSuspenseAccount(branchFinancialAudit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/back/selected', branchFinancialAudit);
  }

  deleteSelectedSuspenseAccount(branchFinancialAudit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/delete/selected', branchFinancialAudit);
  }


}
