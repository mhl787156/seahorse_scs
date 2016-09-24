import { Component } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/components/typeahead';

import { User } from '../../models/index';

/**
 * This class represents the lazy loaded AdminComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'admin-em',
  templateUrl: 'em.component.html',
  styleUrls: ['em.component.css'],
  directives: [TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class EMComponent {
  username: string = '';

  user: User = new User();

  newUserOpen: boolean = false;
  newUserButtonValue: string = 'Create New User';


  toggleUserOpenSave() {
    if(this.newUserOpen && confirm('Are You sure you want to create this user?')) {
      this.saveNewUser();
    }

    this.newUserOpen = !this.newUserOpen;
    this.newUserButtonValue = this.newUserOpen ? 'Save New User' : 'Create New User';
  }

  saveNewUser() {
    console.log('Save New User!');
  }
}
