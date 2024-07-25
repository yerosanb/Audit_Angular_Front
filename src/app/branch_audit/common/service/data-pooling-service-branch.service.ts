
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { OperationalDescripancyPooledData } from 'app/branch_audit/operational-descripancy/data-pooling-branch/operational-descripancy-pooled-data';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch_audit/data_pooling/';

@Injectable({
  providedIn: 'root',
})
export class DataPoolingServiceBranchService {
  constructor(private httpClient: HttpClient) {}


  getFiles(): Observable<any> {
    return this.httpClient.get(`${baseUrl}/files`);
  }

  getFilesByFileName(uploaded_files: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/files`, uploaded_files);
  }

  deletePooledData(audits: BranchFinancialAudit[]): Observable<any> {
    return this.httpClient.post(baseUrl + 'deletePooledData', audits);
  }

  getPooledData(pooler: OperationalDescripancyPooledData): Observable<any> {
    return this.httpClient.post(baseUrl + 'getPooledData', pooler);
  }

  addToPool(poolData: OperationalDescripancyPooledData): Observable<any> {
    return this.httpClient.post(baseUrl + 'addToPool', poolData);
  }

}

