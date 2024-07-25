import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';

const rootURL = environment.backendUrl;
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: HttpClient) { }

  getApprovedLoansOtherRegions(data: any): Observable<any> {
    return this.http.post(`${rootURL}/approver/getApprovedLoansOtherRegions`, data);
  }
  getApprovedLoansMaker(data: any): Observable<any> {
    return this.http.post(`${rootURL}/getApprovedLoansMaker`, data);
  }

  getDisbursedLoansMaker(data: any): Observable<any> {
    return this.http.post(`${rootURL}/getDisbursedLoansMaker`, data);
  }

  getApprovedButNotDisbursedLoansMaker(data: any): Observable<any> {
    return this.http.post(`${rootURL}/getApprovedButNotDisbursedLoansMaker`, data);
  }
  getRejectedLoanMaker(data:any): Observable<any> {
    return this.http.post(`${rootURL}/getRejectedLoans`, data);
  }

  getApprovedButNotDisbursedLoansHo(data: any): Observable<any> {
    return this.http.post(`${rootURL}/ho/getApprovedButNotDisbursedLoansHo`, data);
  }

  getSummaryReport(data: any): Observable<any> {
    return this.http.post(`${rootURL}/ho/getSummaryReport`, data);
  }

  getRegionalLoansReport(month_year:any):Observable<any>{
    return this.http.get(`${rootURL}/ho/getRegionalLoansReports/${month_year}`);
  }
  drawFCYGeneratedBarChartHO(): Observable<any> {
    return this.http.get(`${rootURL}/ho/drawFCYGeneratedBarChartHO`);
  }

  drawLoanStatusLineChartHO(): Observable<any> {
    return this.http.get(`${rootURL}/ho/drawLoanStatusLineChartHO`);
  }


  getApprovedButNotDisbursedLoans(data: any): Observable<any> {
    return this.http.post(`${rootURL}/approver/getApprovedButNotDisbursedLoans`, data);
  }

  getApprovedLoans(data: any): Observable<any> {
    return this.http.post(`${rootURL}/approver/getApprovedLoans`, data);
  }

  
  getRejectedLoanApprover(report: any): Observable<any> {
    console.log("I am here getRejectedLoanApprover");
    return this.http.post(`${rootURL}/approver/getRejectedLoanApprover`,report);
  }
  getPendingLoanForApprover(report: any): Observable<any> {
    return this.http.post(`${rootURL}/approver/getPendingLoanForApprover`,report);
  }

  getDisbursedLoansApprover(data:any): Observable<any> {
    return this.http.post(`${rootURL}/approver/getDisbursedLoansApprover`, data);
  }

  getPendingLoanForApproverOtherRegions(report: any): Observable<any> {
    return this.http.post(`${rootURL}/approver/getPendingLoanForApproverOtherRegions`,report);
  }
  getRejectedLoanForApproverOtherRegions(report: any): Observable<any> {
    return this.http.post(`${rootURL}/approver/getRejectedLoanForApproverOtherRegions`,report);
  }
  getDisbursedLoanForApproverOtherRegions(data: any): Observable<any> {
    return this.http.post(`${rootURL}/approver/getDisbursedLoanForApproverOtherRegions`,data);
  }

}
