import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { User } from 'app/models/admin/user';
import { Observable } from 'rxjs';
const baseUrl =
  environment.backendUrl + '/branch_audit/auditor/memorandum_contigent';

@Injectable({
  providedIn: 'root',
})
export class AuditorMemorandumService {
  constructor(private httpClient: HttpClient) {}

  create_audits(audit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/create', audit);
  }

  getPassedAudit(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/passed/' + `${id}`
    );
  }

  getDrafting(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/drafted/' + `${id}`
    );
  }
}
