import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Password } from 'app/models/password/password';
import { environment } from 'environments/environment.prod';
import { User } from 'app/models/admin/user';
const AUTH_API = environment.backendUrl + '/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(username: string, password: string,userAgent:any): Observable<any> {
    return this.http.post(
      AUTH_API + '/signin',
      {
        username,
        password,
        userAgent

      },
      httpOptions
    );
  }

  logout(id_login_tracker: any): Observable<any> {
    return this.http.get(`${AUTH_API}/signout/${id_login_tracker}`,
      httpOptions
    );
  }

  changePassword(password: Password): Observable<any> {
    return this.http.post(
      AUTH_API + '/changePassword',
      {
        password
      },
      httpOptions
    );
  }

  refreshToken() {
    return this.http.post(
      AUTH_API + '/refreshtoken',
      {},
      httpOptions
    );
  }

  signup(user: User): Observable<any> {
    console.log(user);
    return this.http.post(
      AUTH_API + '/signup',
        user,
      httpOptions
    );
  }
  // signup(data: any): Observable<any> {
  //   return this.http.post(`${AUTH_API}/signup`,data);
  // }
}
