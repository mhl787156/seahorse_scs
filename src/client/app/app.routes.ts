import { provideRouter, RouterConfig } from '@angular/router';

import { CustomersRoutes } from './+customers/index';
import { HomeRoutes } from './+home/index';
import { OrdersRoutes } from './+orders/index';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...CustomersRoutes,
  ...OrdersRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
