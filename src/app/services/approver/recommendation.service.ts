import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
import { Recommendation } from './recommendation';
const baseUrl = environment.backendUrl + '/audit/common';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  constructor(private httpClient: HttpClient) {}

  createCommon(data: Recommendation): Observable<any> {
    return this.httpClient.post(`${baseUrl}/recommendation`, data);
  }
  getRecommondation(user_id: any): Observable<any> {
    return this.httpClient.get(`${baseUrl}/recommendation/` + `${user_id}`);
  }

  getRecommondations(): Observable<any> {
    return this.httpClient.get(`${baseUrl}/recommendation`);
  }
  getRecommondationsByAuditType(audit_type: any): Observable<any> {
    return this.httpClient.get(`${baseUrl}/recommendations/` + `${audit_type}`);
  }

  deleteRecommendation(id: any): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/delete/` + `${id}`);
  }
  deleteRecommendations(recommendations: any): Observable<any> {
    return this.httpClient.post(
      `${baseUrl}/delete/recommendations`,
      recommendations
    );
  }
}
