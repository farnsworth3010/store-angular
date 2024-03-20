import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { User } from './interfaces/user';

export const authInit = () => {
  const authService = inject(AuthService);
  return (): Observable<void> => {
    return new Observable<void>(subscriber => {
      if (authService.getToken()) {
        authService.getUserInfo().subscribe({
          next: (user: User) => {
            authService.userInfo.next(user);
            authService.authorizedSubject.next(true);
          },
          error: () => {
            authService.authorizedSubject.next(false);
            authService.resetToken();
          },
        });
      }
      subscriber.complete();
    });
  };
};
