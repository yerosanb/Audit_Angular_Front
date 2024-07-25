
import { environment } from 'environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/all_audit';

@Injectable({
  providedIn: 'root',
})
export class BranchFinancialAuditService {
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

  getFilesByFileName(uploaded_files:any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/files`, uploaded_files);
  }
}

