import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideMarkdown } from 'ngx-markdown';
import { NzModalService } from 'ng-zorro-antd/modal';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { authInit } from './core/authInit';
import { AuthService } from './core/services/auth/auth.service';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor])),
    NzModalService,
    provideMarkdown(),
    provideRouter(routes),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: authInit,
      deps: [AuthService],
      multi: true,
    },
  ],
};
