import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch_audit/auditor/status_of_audit/';

@Injectable({
  providedIn: 'root'
})
export class PassedStatusOfAuditServiceService {

  constructor(
    private httpClient: HttpClient,
    ) { }

    getPassedStatusOfAudit(id: any): Observable<any> {
      return this.httpClient.get<BranchFinancialAudit[]>(baseUrl + 'getPassedStatusOfAudit/' + `${id}`);
    }

    backSelectedStatusOfdAudits(audit: BranchFinancialAudit[]): Observable<any> {
      return this.httpClient.post(baseUrl + 'back/selected', audit);
    }

    backStatusOfAudit(id: any): Observable<any> {
      return this.httpClient.get<any>(baseUrl + 'back/' + `${id}`);
    }

}
