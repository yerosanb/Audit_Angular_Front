import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch/reviewer/general-observation';

@Injectable({
  providedIn: 'root'
})
export class GeneralObservationReviewerService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPendingGeneralObservation(user: any): Observable<any> {
    return this.httpClient.post(baseUrl + '/pending', user);
  }

  getReviewedGeneralObservation(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/reviewed/' + `${id}`
    );
  }


}
