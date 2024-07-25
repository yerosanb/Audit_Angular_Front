import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonFinding } from 'app/models/shared/audit/common-finding';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/audit/common';

@Injectable({
  providedIn: 'root',
})
export class CommonFindingService {
  constructor(private httpClient: HttpClient) {}
  getCommonFinding(user_id: any): Observable<any> {
    return this.httpClient.get<CommonFinding[]>(
      baseUrl + '/finding/' + `${user_id}`
    );
  }

  getCommonFindings(): Observable<any> {
    return this.httpClient.get<CommonFinding[]>(baseUrl + '/finding');
  }

  getFindingsByAuditType(audit_type: any): Observable<any> {
    return this.httpClient.get<CommonFinding[]>(
      baseUrl + '/findings/' + `${audit_type}`
    );
  }

  addCommonFinding(commonFinding: CommonFinding): Observable<any> {
    return this.httpClient.post(baseUrl + '/finding', commonFinding);
  }

  deleteCommonFinding(id: any): Observable<any> {
    return this.httpClient.delete(baseUrl + "/finding/" + `${id}`);
  }


  deleteSelectedCommonFinding(findings: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/delete/findings`, findings);
  }
}
