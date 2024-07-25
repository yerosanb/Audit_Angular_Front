import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Branches } from 'app/models/admin/branches';
import { environment } from 'environments/environment.prod';
const baseUrl = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { }
  getBranches(): Observable<Branches[]> {
    return this.http.get<Branches[]>(`${baseUrl}/branch`);
  }

  getActiveBranchesList(): Observable<Branches[]> {
    return this.http.get<Branches[]>(`${baseUrl}/branch/active`);
  }
  createBranch(branches: Branches): Observable<object> {
    return this.http.post(`${baseUrl}/branch`, branches)
  }
  getBranchById(id: number): Observable<Branches> {
    return this.http.get<Branches>(`${baseUrl}/branch/${id}`);
  }
  deleteBranches(branches: Branches[]): Observable<object> {
    return this.http.post(`${baseUrl}/branch/delete`, branches)
  }
  activateBranches(branches: Branches[]): Observable<object> {
    return this.http.post(`${baseUrl}/branch/activate`, branches)
  }
}
