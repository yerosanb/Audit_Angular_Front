import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const rootURL = environment.backendUrl + '/restore'
@Injectable({
  providedIn: 'root'
})
export class RestoreService {
  constructor(private http: HttpClient) { }

  restoreBackup(data: any): Observable<any> {
    return this.http.post(`${rootURL}/restoreBackup`, data);
  }
}

