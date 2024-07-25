
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
import { RemarkBranchAudit } from '../model/remark-branch-audit';

const rootURL = environment.backendUrl + "/remark_branch_audit";
@Injectable({
  providedIn: 'root'
})
export class RemarkBranchAuditService {

  constructor(private http: HttpClient){}

  addRemark(data: any): Observable<any> {
    console.log(data)
    return this.http.post(`${rootURL}/addRemark`, data);
  }

  seenRemark(data: any): Observable<any> {
    return this.http.post(`${rootURL}/seenRemark`, data);
  }
  setReciever(data: any): Observable<any> {
    return this.http.post(`${rootURL}/setReciever`, data);
  }
  getUnseenRemarks(data: any): Observable<any> {
    return this.http.post(`${rootURL}/getUnseenRemarks`, data);
  }

  getAllUnseenRemarks(data: any): Observable<any> {
    return this.http.post(`${rootURL}/getAllUnseenRemarks`, data);
  }

  getRemarks(remark: RemarkBranchAudit): Observable<any> {
    return this.http.post(`${rootURL}/getRemarks`, remark);
  }

  getUserByCategory(category: String): Observable<any> {
    return this.http.get(`${rootURL}/user/${category}`);
  }

}

