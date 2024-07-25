import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { OperationalDescripancyCategory } from 'app/branch_audit/model/operational-descripancy/operational-descripancy-category';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';

const baseUrl = environment.backendUrl + '/branch/auditor/operational_descripancy_category';

@Injectable({
  providedIn: 'root'
})
export class OperationalDescripancyCategoryService {
  constructor(private httpClient: HttpClient) { }

  getOperationalDescripancyCategory(): Observable<any> {
    return this.httpClient.get<OperationalDescripancyCategory[]>( baseUrl + '/descripancy_category' );
  }
 
  getOperationalDescripancyCategoryByCatagory(category:any): Observable<any> {
    return this.httpClient.get<OperationalDescripancyCategory[]>( baseUrl + '/descripancy_category/'+ `${category}` );
  }
  createOperationalDescriptionCategory(operationalDescripancyCategory: OperationalDescripancyCategory): Observable<any> {
    return this.httpClient.post(baseUrl + '/create', operationalDescripancyCategory);
  }


  deleteOperationalDescripancyCategory(operationalDescripancyCategory: OperationalDescripancyCategory): Observable<any> {
    return this.httpClient.post(baseUrl + '/delete' , operationalDescripancyCategory);
  }

}
