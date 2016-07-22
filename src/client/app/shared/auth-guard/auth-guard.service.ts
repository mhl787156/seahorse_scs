// auth-guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (tokenNotExpired()) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
