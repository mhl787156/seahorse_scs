import { Routes } from '@angular/router';

import { CustomersComponent } from './index';

// import { CanDeactivateGuard } from '../shared/index';

export const CustomersRoutes: Routes = [
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
