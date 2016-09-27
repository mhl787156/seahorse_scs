import { RouterConfig } from '@angular/router';

import { CustomersComponent } from './index';

import { CanDeactivateGuard } from '../shared/index';

export const CustomersRoutes: RouterConfig = [
  {
    path: 'customers',
    component: CustomersComponent,
  },
  {
    path: 'customers/:id',
    component: CustomersComponent,
    // canDeactivate: [CanDeactivateGuard]
  }
];
