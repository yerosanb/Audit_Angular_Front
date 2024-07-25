import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifyAdmin } from 'app/models/admin/notify-admin';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';

const rootURL = environment.backendUrl;
@Injectable({
  providedIn: 'root'
})
export class NotifyMeService {

  constructor(private http: HttpClient) { }

  notifyAdmin(data:any):Observable<any>{
    return this.http.post(`${rootURL}/notifyAdmin`, data);
  }
  viewedNotificationsByAdmin(data: NotifyAdmin[]): Observable<any> {
    return this.http.post(`${rootURL}/viewedNotificationsByAdmin`, data);
  }

}
