import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/is_report';

@Injectable({
  providedIn: 'root'
})
export class ISReportService {

  constructor(private http: HttpClient) { }

  getIs_Report(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/search`, data);
  }

 getDivisionsByDirectorateID(directorate_id: any): Observable<any> {
    return this.http.get(`${baseUrl}/division/${directorate_id}`);
  }
}
