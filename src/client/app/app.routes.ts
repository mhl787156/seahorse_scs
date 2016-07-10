import { provideRouter, RouterConfig } from '@angular/router';

import { CustomersRoutes } from './+customers/index';
import { HomeRoutes } from './+home/index';
import { OrdersRoutes } from './+orders/index';
import { AdminRoutes } from './+admin/index';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...CustomersRoutes,
  ...AdminRoutes,
  ...OrdersRoutes,
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
