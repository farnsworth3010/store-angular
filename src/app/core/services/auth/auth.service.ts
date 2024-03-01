import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../constants/apiUrl';
import { ApiPostResponse } from '../../interfaces/response';
import { User, SignInData, JWTToken, SignUpData } from '../../interfaces/user';

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

  userInfo = new BehaviorSubject<User | null>(null);

  getUserInfo(): Observable<User> {
    return this.http.get<User>(apiUrl + '/auth/info');
  }

  deleteUser(): Observable<void> {
    return this.http.delete<void>(apiUrl + '/auth/');
  }

  saveToken(token: string, temp: boolean) {
    if (!temp) {
      localStorage.setItem('access_token', token);
    }
    this.authorizedSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  signOut(): void {
    localStorage.removeItem('access_token');
    this.authorizedSubject.next(false);
    this.router.navigateByUrl('/');
  }

  signIn(signInData: SignInData): Observable<JWTToken> {
    return this.http.post<JWTToken>(apiUrl + `/auth/sign-in`, {
      ...signInData,
    });
  }

  signUp(signUpData: SignUpData): Observable<ApiPostResponse> {
    return this.http.post<ApiPostResponse>(apiUrl + `/auth/sign-up`, {
      ...signUpData,
    });
  }

  canActivate(): boolean {
    return this.authorizedSubject.getValue();
  }
}

export const authGuard: CanActivateFn = () => {
  return inject(AuthService).canActivate();
};
