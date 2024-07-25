import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch/auditor/operational_descripancy_branch';

@Injectable({
  providedIn: 'root'
})
export class OperatioalDescripancyAuditorBranchService {


  constructor(private httpClient: HttpClient) { }

  getDraftedOperationalDescripancies(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/drafted/' + `${id}`
    );
  }
  getPassedOperationalDescripancies(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/passed/' + `${id}`
    );
  }
  getOnProgressOperationalDescripancies(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/progress/' + `${id}`
    );
  }

  createOperationalDescripancy(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/create', branchFinancialAudit);
  }

  passOperationalDescripancy(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/pass', branchFinancialAudit);
  }
  passSelectedOperattionalDescripancy(branchFinancialAudit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/pass/selected', branchFinancialAudit);
  }

  backOperationalDescripancy(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/back', branchFinancialAudit);
  }

  backSelectedOperationalDescripancy(branchFinancialAudit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/back/selected', branchFinancialAudit);
  }



  deleteOperationalDescripancy(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/delete' , branchFinancialAudit);
  }

  deleteSelectedOperationalDescripancy(branchFinancialAudit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/delete/selected', branchFinancialAudit);
  }
}
