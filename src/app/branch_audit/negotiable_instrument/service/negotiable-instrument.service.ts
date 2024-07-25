
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch/auditor/negotiable_instrument_branch';

@Injectable({
  providedIn: 'root'
})
export class NegotiableInstrumentService {


  constructor(private httpClient: HttpClient) { }
  createNegotiableInstrument(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/create', branchFinancialAudit);
  }

  getDraftedNegotiableInstrument(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/drafted/' + `${id}`
    );
  }
  getPassedNegotiableInstrument(id: any): Observable<any> {
    return this.httpClient.get<[BranchFinancialAudit]>(
      baseUrl + '/passed/' + `${id}`
    );
  }
  getOnProgressNegotiableInstrument(id: any): Observable<any> {
    return this.httpClient.get<BranchFinancialAudit[]>(
      baseUrl + '/progress/' + `${id}`
    );
  }


  passNegotiableInstrument(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/pass', branchFinancialAudit);
  }
  passSelectedNegotiableInstrument(branchFinancialAudit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/pass/selected', branchFinancialAudit);
  }

  backPassedNegotiableInstrument(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post( baseUrl + '/back' ,branchFinancialAudit);
  }

  deleteNegotiableInstrument(branchFinancialAudit: BranchFinancialAudit): Observable<any> {
    return this.httpClient.post(baseUrl + '/delete', branchFinancialAudit);
  }

  backSelectedPassedNegotiableInstrument(branchFinancialAudit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/back/selected', branchFinancialAudit);
  }

  deleteSelectedNegotiableInstrument(branchFinancialAudit: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/delete/selected', branchFinancialAudit);
  }


}
