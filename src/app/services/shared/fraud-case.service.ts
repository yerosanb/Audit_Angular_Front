import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FraudCase } from 'app/models/shared/fraud-case';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';

const baseUrl = environment.backendUrl+'/fraudcase';
@Injectable({
  providedIn: 'root'
})
export class FraudCaseService {

  constructor(private http: HttpClient) { }

  createFraudCase(data:FraudCase):Observable<any>{
    return this.http.post(`${baseUrl}/create`, data);
  }


  getInitialFraudCase(initial: number):Observable<any>{
    return this.http.get(`${baseUrl}/auditor/initial/${initial}`);
  }


  getDraftedFraudCase(user_id: any):Observable<any>{
    return this.http.get(`${baseUrl}/auditor/drafted/${user_id}`);
  }


  getPassedFraudCase(user_id: any):Observable<any>{
    return this.http.get(`${baseUrl}/auditor/passed/${user_id}`);
  }


  getApprovedFraudCase(user_id: any):Observable<any>{
    return this.http.get(`${baseUrl}/auditor/approved/${user_id}`);
  }

  passFraudCase(id: any):Observable<any>{
    return this.http.get(`${baseUrl}/auditor/pass/${id}`);
  }

  backFraudCase(id: any):Observable<any>{
    return this.http.get(`${baseUrl}/auditor/back/${id}`);
  }


  approveFraudCase(data:FraudCase):Observable<any>{
    return this.http.post(`${baseUrl}/approver/approve`, data);
  }

  backApprovedFraudCase(id: any):Observable<any>{
    return this.http.get(`${baseUrl}/approver/cancel/${id}`);
  }


  getApprovedFraudCasesApprover(approver_id: number):Observable<any>{
    return this.http.get(`${baseUrl}/approver/approved/`+`${approver_id}`);
  }

  getPendingFraudCasesApprover():Observable<any>{
    return this.http.get(`${baseUrl}/approver/pending`);
  }


    deleteFraudCase(id:any):Observable<any>{
    return this.http.delete(`${baseUrl}/auditor/delete/`+`${id}`);
  }

}






