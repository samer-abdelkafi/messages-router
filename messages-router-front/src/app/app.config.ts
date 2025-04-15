import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {httpErrorInterceptor} from './shared/interceptors/http-error.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes, withHashLocation()),
        provideHttpClient(
          withInterceptors([httpErrorInterceptor]),
        )
    ]
};
