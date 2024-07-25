import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch/branch_manager/status_of_audit';

@Injectable({
  providedIn: 'root'
})
export class StatusofauditbranchmanagerService {

  constructor(private httpClient: HttpClient) { }


  getPendingAudits(branch_id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/pending/' + `${branch_id}`
    );
  }
}
