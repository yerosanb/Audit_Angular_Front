import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Audit_ISM } from 'app/models/auditor/audit_ISM';
import { Remark } from 'app/models/shared/audit/remark';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';

const rootURL = environment.backendUrl + "/remark";
@Injectable({
  providedIn: 'root'
})
export class AuditRemarkService {
  addRemark(data: any): Observable<any> {
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


  getUnseenRemarksUnassignedApprover(data: any): Observable<any> {
    return this.http.post(`${rootURL}/getUnseenRemarksUnassignedApprover`, data);
  }
  getRemarks(remark: Remark): Observable<any> {
    return this.http.post(`${rootURL}/getRemarks`, remark);
  }

  getUserByCategory(audit: Audit_ISM): Observable<any> {
    return this.http.post(`${rootURL}/user`, audit);

  }
////////

  constructor(private http: HttpClient){}
  addRemarkINS(data: any): Observable<any> {
    return this.http.post(`${rootURL}/addRemarkINS`, data);
  }

  seenRemarkINS(data: any): Observable<any> {
    return this.http.post(`${rootURL}/seenRemarkINS`, data);
  }
  setRecieverINS(data: any): Observable<any> {
    return this.http.post(`${rootURL}/setRecieverINS`, data);
  }
  getUnseenRemarksINS(data: any): Observable<any> {
    return this.http.post(`${rootURL}/getUnseenRemarksINS`, data);
  }


  getUnseenRemarksUnassignedApproverINS(data: any): Observable<any> {
    return this.http.post(`${rootURL}/getUnseenRemarksUnassignedApproverINS`, data);
  }
  getRemarksINS(remark: Remark): Observable<any> {
    return this.http.post(`${rootURL}/getRemarksINS`, remark);
  }

  getUserByCategoryINS(category: String): Observable<any> {
    return this.http.get(`${rootURL}/userINS/${category}`);
  }

  ///////////////////////////

}
