import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  deleteUser(): void {}
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  canActivate(): boolean {
    return this.authorizedSubject.getValue();
  }
}

export const authGuard: CanActivateFn = () => {
  return inject(AuthService).canActivate();
};
