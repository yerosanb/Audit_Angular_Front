
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch/reviewer/asset_liability';

@Injectable({
  providedIn: 'root'
})
export class AssetLiabilityReviewerBranchService {

  constructor(private httpClient: HttpClient) { }

  getPendingAssetLiablity(user: any): Observable<any> {
    return this.httpClient.post(baseUrl + '/pending', user);
  }


  getReviewedAssetLiablity(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/reviewed/' + `${id}`
    );
  }

}
