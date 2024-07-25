import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch/auditor/abnormal_balance';

@Injectable({
  providedIn: 'root'
})
export class AbnormalBalanceAuditorBranchService {


  constructor(private httpClient: HttpClient) { }
  createAbnormalBalance(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/create', branchFinancialAudit);
  }

  getDraftedAbnormalBalance(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/drafted/' + `${id}`
    );
  }
  getPassedAbnormalBalance(id: any): Observable<any> {
    return this.httpClient.get<[BranchFinancialAudit]>(
      baseUrl + '/passed/' + `${id}`
    );
  }
  getOnProgressAbnormalBalance(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/progress/' + `${id}`
    );
  }


  passAbnormalBalance(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/pass', branchFinancialAudit);
  }
  passSelectedAbnormalBalance(branchFinancialAudit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/pass/selected', branchFinancialAudit);
  }

  backPassedAbnormalBalance(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post( baseUrl + '/back' ,branchFinancialAudit);
  }

  deleteAbnormalBalance(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/delete', branchFinancialAudit);
  }

  backSelectedPassedAbnormalBalance(branchFinancialAudit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/back/selected', branchFinancialAudit);
  }

  deleteSelectedAbnormalBalance(branchFinancialAudit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/delete/selected', branchFinancialAudit);
  }


}
