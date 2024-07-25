
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch/branch_manager/general_observation';

@Injectable({
  providedIn: 'root'
})
export class GeneralObservationBranchManagerService {


  constructor(private httpClient: HttpClient) { }


  getPendingAudits(branch_id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/pending/' + `${branch_id}`
    );
  }
  getRectfiedAudits(user_id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/rectified/' + `${user_id}`);
  }

  rectifiyAudit(audit: any): Observable<any> {
    return this.httpClient.post( baseUrl + '/rectify',audit );
  }

  getRespondedAudits(user_id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/responded/' + `${user_id}`
    );
  }

  giveResponse(audit: any): Observable<any> {
    return this.httpClient.post( baseUrl + '/give_response',audit );
  }

  giveSelectedResponse(audit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post( baseUrl + '/give_response/selected',audit );
  }

}
