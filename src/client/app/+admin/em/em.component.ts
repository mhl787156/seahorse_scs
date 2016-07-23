import { Component } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/components/typeahead';

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
}
