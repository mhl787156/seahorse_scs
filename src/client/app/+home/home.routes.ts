import { RouterConfig } from '@angular/router';

import { HomeComponent } from './index';

export const HomeRoutes: RouterConfig = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    component: HomeComponent,
  }
];
