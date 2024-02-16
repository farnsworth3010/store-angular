import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const access_token: string | null = localStorage.getItem('access_token');
  if (access_token) {
    return next(
      req.clone({
        headers: req.headers.set('Authorization', `Bearer ${access_token}`),
      })
    );
  } else {
    return next(req);
  }
};
