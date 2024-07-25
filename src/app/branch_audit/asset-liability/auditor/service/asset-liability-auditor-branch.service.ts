import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch/auditor/asset_liability';

@Injectable({
  providedIn: 'root'
})
export class AssetLiabilityAuditorBranchService {

  constructor(private httpClient: HttpClient) { }

  getDraftedAssetLiablity(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/drafted/' + `${id}`
    );
  }
  getPassedAssetLiablity(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/passed/' + `${id}`
    );
  }
  getOnProgressAssetLiablity(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/progress/' + `${id}`
    );
  }

  createAssetLiablity(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/create', branchFinancialAudit);
  }

  passAssetLiablity(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/pass', branchFinancialAudit);
  }
  passSelectedAssetLiablity(branchFinancialAudit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/pass/selected', branchFinancialAudit);
  }

  backPassedAssetLiablity(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/back', branchFinancialAudit);
  }

  backSelectedPassedAssetLiablity(branchFinancialAudit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/back/selected', branchFinancialAudit);
  }



  deleteAssetLiability(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/delete' , branchFinancialAudit);
  }

  deleteSelectedAssetLiability(branchFinancialAudit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/delete/selected', branchFinancialAudit);
  }

}
