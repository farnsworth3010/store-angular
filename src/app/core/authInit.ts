import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { User } from './interfaces/user';

export const authInit = () => {
  const authService = inject(AuthService);
  return (): Observable<void> => {
    return new Observable<void>(subscriber => {
      if (authService.getToken()) {
        authService.authorizedSubject.next(true);
        authService.getUserInfo().subscribe({
          next: (user: User) => {
            authService.userInfo.next(user);
          },
        });
      }
      subscriber.complete();
    });
  };
};
