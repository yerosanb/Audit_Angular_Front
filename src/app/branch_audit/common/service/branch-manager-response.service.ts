import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/auditor/auditee_response';


@Injectable({
  providedIn: 'root',
})
export class BranchManagerResponseService {
  constructor(private httpClient: HttpClient) {}

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    const req = new HttpRequest('POST', `${baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.httpClient.request(req);
  }
  getFiles(): Observable<any> {
    return this.httpClient.get(`${baseUrl}/files`);
  }

  getFilesByFileName(uploaded_files: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/files`, uploaded_files);
  }

  add_response(auditee_response: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/add', auditee_response);
  }

  rectify_auditee_response(auditee_response: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + '/rectify', auditee_response);
  }
  
}
