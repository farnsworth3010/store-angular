import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { User } from './interfaces/user';

export const authInit = () => {
  const authService = inject(AuthService);
  const userService = inject(UserService);
  return (): Observable<void> => {
    return new Observable<void>(subscriber => {
      if (authService.getToken()) {
        authService.authorizedSubject.next(true);
        userService.getUserInfo().subscribe({
          next: (user: User) => {
            userService.userInfo.next(user);
          },
          error: err => {
            console.log(err);
          },
        });
      }
      subscriber.complete();
    });
  };
};
