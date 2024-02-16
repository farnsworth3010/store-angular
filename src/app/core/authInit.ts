import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const authInit = () => {
  const authService = inject(AuthService);
  return (): Observable<void> => {
    return new Observable<void>(subscriber => {
      if (authService.getToken()) {
        authService.authorizedSubject.next(true);
      }
      subscriber.complete();
    });
  };
};
