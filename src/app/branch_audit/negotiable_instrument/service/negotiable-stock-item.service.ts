

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NegotiableStockItem } from 'app/branch_audit/model/negotiable_stock_item/negotiable-stock-item';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';

const baseUrl = environment.backendUrl + '/branch/auditor/negotiable_stock_item';

@Injectable({
  providedIn: 'root'
})
export class NegotiableStockItemService {
  constructor(private httpClient: HttpClient) { }

  getNegotiableStockItem(): Observable<any> {
    return this.httpClient.get<NegotiableStockItem[]>( baseUrl + '/negotiable_stock_item' );
  }
 
  getNegotiableStockItemByCatagory(category:any): Observable<any> {
    return this.httpClient.get<NegotiableStockItem[]>( baseUrl + '/negotiable_stock_item/'+ `${category}` );
  }
  createNegotiableStockItem(negotiableStockItem: NegotiableStockItem): Observable<any> {
    return this.httpClient.post(baseUrl + '/create', negotiableStockItem);
  }


  deleteNegotiableStockItem(negotiableStockItem: NegotiableStockItem): Observable<any> {
    return this.httpClient.post(baseUrl + '/delete' , negotiableStockItem);
  }

}
