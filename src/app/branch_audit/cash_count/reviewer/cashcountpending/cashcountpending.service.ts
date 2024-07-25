import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + '/branch_audit/reviewer/cash_count/';

@Injectable({
  providedIn: 'root',
})
export class CashcountpendingService {
  constructor(private httpClient: HttpClient) {}

  getCashCountForReviewer(user: any): Observable<any> {
    return this.httpClient.post(baseUrl + 'pending', user);
  }
}
