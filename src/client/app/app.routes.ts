import { provideRouter, RouterConfig } from '@angular/router';

import { AuthGuardService } from './shared/index';

import { CustomersRoutes } from './+customers/index';
import { HomeRoutes } from './+home/index';
import { OrdersRoutes } from './+orders/index';
import { AdminRoutes } from './+admin/index';
import { LoginRoutes } from './login/index';

const loginroutes: RouterConfig = [
  ...HomeRoutes,
  ...CustomersRoutes,
  ...AdminRoutes,
  ...OrdersRoutes
];

const routes: RouterConfig = [
  ...LoginRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(makeRoutes()),
];

function makeRoutes() : RouterConfig {
  let lr = loginroutes.map(conf => {
              conf.canActivate = [AuthGuardService];
              return conf;
           });
  return routes.concat(lr);
}

