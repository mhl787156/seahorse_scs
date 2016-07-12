import { RouterConfig } from '@angular/router';

import { HomeComponent } from './index';
import { AuthGuardService } from '../shared/index';

export const HomeRoutes: RouterConfig = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
];
