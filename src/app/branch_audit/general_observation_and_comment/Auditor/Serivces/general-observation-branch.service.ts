
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
const baseUrl = environment.backendUrl + '/branch_audit/auditor/general_observation/';

@Injectable({
  providedIn: 'root'
})
export class GeneralObservationBranchService {

  constructor(
    private httpClient: HttpClient
  ) { }

  createGeneralObservationAndComment(generalObservation: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + 'create', generalObservation);
  }
  getDraftedGeneralObservationAndComment(id: any): Observable<any> {
    return this.httpClient.get<any>(
      baseUrl + 'drafted/' + `${id}`
    );
  }
  passGeneralObservationAudit(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + 'pass', branchFinancialAudit);
  }

  deleteGeneralObservationAudit(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + 'delete' , branchFinancialAudit);
  }
  deleteSelectedGeneralObservationAudits(branchFinancialAudit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + 'delete/selected', branchFinancialAudit);
  }
  passSelectedGeneralObservationAudits(branchFinancialAudit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + 'pass/selected', branchFinancialAudit);
  }
  backSelectedPassedGeneralObservation(branchFinancialAudit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + 'back/selected', branchFinancialAudit);
  }
  backPassedGEneralObservation(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + 'back', branchFinancialAudit);
  }
  getPassedGeneralObservation(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + 'passed/' + `${id}`
    );
  }

}
