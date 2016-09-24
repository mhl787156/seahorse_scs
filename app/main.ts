/*import { provide } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { HTTP_PROVIDERS, Http } from '@angular/http';
import { AuthGuardService } from './shared/index';
import { AuthService } from './login/index';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import { AppComponent } from './app.component';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }*/

/**
 * Bootstraps the application and makes the ROUTER_PROVIDERS and the APP_BASE_HREF available to it.
 * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
 *//*
bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms(),
  HTTP_PROVIDERS,
  AuthGuardService,
  AuthService,
  APP_ROUTER_PROVIDERS,
  {
    provide: APP_BASE_HREF ,
    useValue: '<%= APP_BASE %>'
  },
  provide(AuthHttp, {
    useFactory: (http:any) => {
      return new AuthHttp(new AuthConfig({
        headerName: 'Authorization',
        headerPrefix: 'Bearer' + (localStorage.getItem('uid') === '' ? '' : ' '+localStorage.getItem('uid')),
        tokenName: 'id_token',
        tokenGetter: (() => localStorage.getItem('id_token')),
        globalHeaders: [{'Content-Type':'application/json'}],
        noJwtError: true,
        noTokenScheme: true
      }), http);
    },
    deps: [Http]
  })
]);
*/


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);