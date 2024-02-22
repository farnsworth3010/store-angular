import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { apiUrl } from '../constants/apiUrl';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.auth.authorizedSubject.subscribe(authorized => {
      if (authorized) {
        this.getUserInfo().subscribe((user: User) => {
          this.userInfo.next(user);
        });
      } else {
        this.userInfo.next(null);
      }
    });
  }
  userInfo = new BehaviorSubject<User | null>(null);
  getUserInfo(): Observable<User> {
    return this.http.get<User>(apiUrl + '/auth/info');
  }
  deleteUser(): Observable<void> {
    return this.http.delete<void>(apiUrl + '/auth/');
  }
}
