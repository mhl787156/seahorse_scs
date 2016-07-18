import { Component } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/components/typeahead';

import {AuthService} from './auth-service/index';

/**
 * This class represents the lazy loaded LoginComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [AuthService],
  directives: [ROUTER_DIRECTIVES, TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  confirmpassword: string = '';

  firstTime: boolean = false;

  /**
   * Creates a new AuthService with the injected service.
   * @param {AuthService} service - The injected login service.
   * @constructor
   */
  constructor(private service: AuthService, private router:Router) {}

  signInButtonPressed() {
    this.service.login({
      username: this.username,
      password: this.password,
    }).subscribe(
      data => {
        console.log(data.token);
        localStorage.setItem('id_token', data.token);
      },
      err => console.log(err),
      () => console.log('Request Complete')
    );
  }

  firstTimeSignInButtonPressed() {
    this.service.setPassword({
       username: this.username,
       password: this.password,
    }).subscribe(
      data => {
        console.log(data.token);
      },
      err => console.log(err),
      () => console.log('Request Complete')
    );
  }

  toggleFirstTime() {
    this.firstTime = !this.firstTime;
  }

}
