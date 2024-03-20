import { Observable, finalize } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { User } from './interfaces/user';

export const authInit = () => {
  const authService = inject(AuthService);
  return (): Observable<void> => {
    return new Observable<void>(subscriber => {
      if (authService.getToken()) {
        authService
          .getUserInfo()
          .pipe(
            finalize(() => {
              subscriber.complete();
            })
          )
          .subscribe({
            next: (user: User) => {
              authService.userInfo.next(user);
              authService.authorizedSubject.next(true);
            },
            error: () => {
              authService.resetToken();
            },
          });
      } else {
        subscriber.complete();
      }
    });
  };
};
