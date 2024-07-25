import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'app/models/admin/user';
import { OnlineFailedUsers } from 'app/models/admin/online-failed-users';
import { environment } from 'environments/environment.prod';
import { Role } from 'app/models/admin/role';
const API_URL = environment.backendUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/user');
  }

  getUsersStatus(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/user_status');
  }

  getJobPositionsByRole(role: Role): Observable<any> {
    return this.http.post<any>(API_URL + '/job_position/byRole', role);
  }

  addUser(user: User, image?: File): Observable<any> {
    const formData = new FormData();
    if (image) {
      formData.append('image', image);
      formData.append(
        'user_data',
        new Blob([JSON.stringify(user)], {
          type: 'application/json',
        })
      );
      console.log(user);
      return this.http.put<User>(API_URL + '/user', formData);
    } else {
      return this.http.post<User>(API_URL + '/user', user);
    }
  }

  getUserById(id: any): Observable<User> {
    return this.http.get<User>(`${API_URL}/user/${id}`);
  }
  getUserIdByEmail(email: any): Observable<any> {
    return this.http.get<any>(`${API_URL}/getUserIdByEmail/${email}`);
  }

  getOnlineFailedUsers(): Observable<OnlineFailedUsers[]> {
    return this.http.get<any>(API_URL + '/login_status');
  }

  updateLoginStatus(loginStatus: OnlineFailedUsers[]): Observable<any> {
    return this.http.post(API_URL + '/login_status', loginStatus);
  }

  unlockUserAccount(user: User): Observable<any> {
    return this.http.post<User>(API_URL + '/user/account', user);
  }

  drawBarChartUsersPerRegion(user: User): Observable<any> {
    // return this.http.get<any>(API_URL + '/user/user_per_region');
    return this.http.post(API_URL + '/admin/dashboard', user);

  }


}
