import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../constants/apiUrl';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}
  public authorizedSubject = new BehaviorSubject<boolean>(false);
  public authorized: Observable<boolean> =
    this.authorizedSubject.asObservable();
  saveToken(token: string) {
    localStorage.setItem('access_token', token);
    this.authorizedSubject.next(true);
  }
  signOut(): void {
    localStorage.removeItem('access_token');
    this.authorizedSubject.next(false);
    this.router.navigateByUrl('/');
  }
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  getUserInfo(): Observable<User> {
    return this.http.post<User>(apiUrl + '/auth/info', {
      token: this.getToken(),
    });
  }
}
