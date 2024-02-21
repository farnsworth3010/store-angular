import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { apiUrl } from '../constants/apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  userInfo = new BehaviorSubject<User | null>(null);
  getUserInfo(): Observable<User> {
    return this.http.get<User>(apiUrl + '/auth/info');
  }
}
