import { Component } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/components/typeahead';

import {EMComponent } from './em/index';

/**
 * This class represents the lazy loaded AdminComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css'],
  directives: [TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, EMComponent]
})
export class AdminComponent {
  sidetab: number = 0;
  usetab: number = 0;

  changeUseTab(n: number) {
    this.usetab = n;
  }

  isUseTab(n:number) {
    return this.usetab === n;
  }

  changeSideTab(n: number) {
    this.sidetab = n;
  }

  isSideTab(n:number) {
    return this.sidetab === n;
  }

}
