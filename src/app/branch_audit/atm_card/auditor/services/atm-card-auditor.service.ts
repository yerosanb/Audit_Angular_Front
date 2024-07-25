import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';

const baseUrl = environment.backendUrl + '/branch/auditor/atm';

@Injectable({
  providedIn: 'root',
})
export class AtmCardAuditorService {
  constructor(private httpClient: HttpClient) {}

  create_Atm(audit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/create', audit);
  }

  getPassedAtm(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/passed/' + `${id}`
    );
  }

  getAuditsATMOnDrafting(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/drafting/' + `${id}`
    );
  }

  getAuditsOnProgressForAuditor(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/progress/' + `${id}`
    );
  }

  deleteBranchAudit(id: any): Observable<any> {
    return this.httpClient.delete<any>(baseUrl + '/delete/' + `${id}`);
  }

  deleteSelectedAudits(audits: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/delete/selected', audits);
  }

  passAtmAudit(id: any): Observable<any> {
    return this.httpClient.get<any>(baseUrl + '/pass/' + `${id}`);
  }

  passSelectedAtmAudit(audits: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/pass/selected', audits);
  }

  backBranchAudit(id: any): Observable<any> {
    return this.httpClient.get<any>(baseUrl + '/back/' + `${id}`);
  }

  backSelectedAudits(audits: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/back/selected', audits);
  }

  getAuditsForAuditor(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/auditor/ism/' + `${id}`
    );
  }
}
