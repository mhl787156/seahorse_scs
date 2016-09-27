import { Routes } from '@angular/router';

import { HomeRoutes } from './home/index';
import { CustomersRoutes } from './customers/index';

import { AuthGuardService } from './shared/index';

const normalroutes: Routes = [
  ...HomeRoutes,
];

const loginroutes: Routes = [
  ...CustomersRoutes
];

function makeRoutes() : Routes {
  let lr = loginroutes.map(conf => {
              conf.canActivate = [AuthGuardService];
              return conf;
           });
  return normalroutes.concat(lr);
}

export const routes = makeRoutes();
