import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch/reviewer/suspense_account';

@Injectable({
  providedIn: 'root',
})
export class SuspenseAccountReviewerService {
  constructor(private httpClient: HttpClient) {}

  getPendingSuspenseAccount(user: any): Observable<any> {
    return this.httpClient.post(baseUrl + '/pending', user);

  }

  getReviewedSuspenseAccount(id: any): Observable<any> {
    return this.httpClient.get<[BranchFinancialAudit[]]>(
      baseUrl + '/reviewed/' + `${id}`
    );
  }
}
