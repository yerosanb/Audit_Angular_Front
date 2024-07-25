import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch_audit/auditor/long_outstanding_items/';

@Injectable({
  providedIn: 'root'
})
export class LongoutstandingitemauditorService {

  constructor( 
    private httpClient: HttpClient,) { }

    saveLongOutstandingItems(audit: BranchFinancialAudit): Observable<any> {
      return this.httpClient.post(baseUrl + 'create', audit);
    }

    getPendingOutstandingItems(id: any): Observable<any> {
      return this.httpClient.get<BranchFinancialAudit[]>(baseUrl + 'pending/' + `${id}`);
    }

    getPassedLongOutstandingItems(id: any): Observable<any> {
      return this.httpClient.get<BranchFinancialAudit[]>(baseUrl + 'passed/' + `${id}`);
    }
    
}
