
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuspenseAccountType } from 'app/branch_audit/model/suspense_account_type/suspense-account-type';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';

const baseUrl = environment.backendUrl + '/branch/auditor/suspense_account_type';

@Injectable({
  providedIn: 'root'
})
export class SuspenseAccountTypeService {
  constructor(private httpClient: HttpClient) { }

  getSuspenseAccountType(): Observable<any> {
    return this.httpClient.get<SuspenseAccountType[]>( baseUrl + '/suspense_account_type' );
  }
 
  getSuspenseAccountTypeByCatagory(category:any): Observable<any> {
    return this.httpClient.get<SuspenseAccountType[]>( baseUrl + '/suspense_account_type/'+ `${category}` );
  }
  createSuspenseAccountType(suspenseAccountType: SuspenseAccountType): Observable<any> {
    return this.httpClient.post(baseUrl + '/create', suspenseAccountType);
  }


  deleteSuspenseAccountType(suspenseAccountType: SuspenseAccountType): Observable<any> {
    return this.httpClient.post(baseUrl + '/delete' , suspenseAccountType);
  }

}
