import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
const baseUrl = environment.backendUrl;
@Injectable({
  providedIn: 'root'
})

export class RoleFunctionalityService {

  constructor(private httpClient: HttpClient) { }


  getRoleFunctionalitiesById(role_id: any): Observable<any> {
    console.log(role_id);
    return this.httpClient.get<any>(baseUrl + '/getRoleFunctionalitiesById/' + role_id);

  }

  updateRoleFunctionalityStatus(
    role_id: any,
    functionalities_status: any
  ): Observable<any> {

    console.log(JSON.stringify(functionalities_status))
    console.log(functionalities_status)


    return this.httpClient.post<any>(
      baseUrl + '/updateRoleFunctionalitiesById/' + role_id, JSON.stringify(functionalities_status)
    );
  }

  updateFunctionalityStatus(
    functionalities_status: any
  ): Observable<any> {

    return this.httpClient.post<any>(
      baseUrl + '/updateFunctionalitiesById', JSON.stringify(functionalities_status)
    );
  }

  updateFunctionalityStatusNoRole(
    functionalities_status: any
  ): Observable<Boolean> {
    return this.httpClient.put<Boolean>(
      baseUrl + '/update_functionality_status_no_role',
      JSON.stringify(functionalities_status)
    );
  }


  getAllRoleFunctionalities(): Observable<any> {
    return this.httpClient.get<any>(
      baseUrl + '/getAllRoleFunctionalities'
    );
  }
}
