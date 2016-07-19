import { Component } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap/components/typeahead';

import { AuthService } from './auth-service/index';

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

  active: boolean = true;

  username: string = '';
  password: string = '';
  confirmpassword: string = '';

  detailsRecognised : boolean = false;

  firstTime: boolean = false;

  submitted: boolean = false;

  errormsg: string = 'Details not recognised, if you have forgotten your password, please ask the admin to reset it for you';

  /**
   * Creates a new AuthService with the injected service.
   * @param {AuthService} service - The injected login service.
   * @constructor
   */
  constructor(private service: AuthService, private router:Router) {}

  signIn() {
    this.service.login({
      username: this.username,
      password: this.password,
    }).subscribe(
      token => {
        localStorage.setItem('id_token', token);
        this.detailsRecognised = true;
        this.router.navigateByUrl('/home');
      },
      err => {
        this.password = '';
        console.log(err);
        if(err !== '' ) {this.errormsg = err;}
      },
      () => console.log('Request Complete')
    );
    this.submitted = true;
  }

  firstTimeSignIn() {
    this.service.setPassword({
       username: this.username,
       password: this.password,
    }).subscribe(
      data => {
        this.detailsRecognised = true;
      },
      err => {console.log(err); if(err !== '' ) {this.errormsg = err;}},
      () => console.log('Request Complete')
    );
    this.clearFields();
    this.submitted = true;
  }

  toggleFirstTime() {
    this.firstTime = !this.firstTime;
  }

  clearFields() {
    this.username = '';
    this.password = '';
    this.confirmpassword = '';
    this.firstTime = false;
  }

}
