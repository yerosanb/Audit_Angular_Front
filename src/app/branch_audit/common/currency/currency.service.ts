import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
import { Currency } from './currency';

const baseUrl = environment.backendUrl + '/currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private httpClient: HttpClient) {}

  getCurrency(): Observable<Currency[]> {
    return this.httpClient.get<Currency[]>(baseUrl + '/getAllCurrency');
  }
  getCurrencyById(id: number): Observable<Currency> {
    return this.httpClient.get<Currency>(
      baseUrl + '/getCurrencyById/' + `${id}`
    );
  }
}
