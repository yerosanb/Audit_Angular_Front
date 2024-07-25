import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch/reviewer/abnormal_balance';

@Injectable({
  providedIn: 'root',
})
export class AbnormalBalanceReviewerBranchService {
  constructor(private httpClient: HttpClient) {}

  getPendingAbnormalBalance(user: any): Observable<any> {
    return this.httpClient.post(baseUrl + '/pending', user);
  }

  getReviewedAbnormalBalance(id: any): Observable<any> {
    return this.httpClient.get<[BranchFinancialAudit[]]>(
      baseUrl + '/reviewed/' + `${id}`
    );
  }
}
