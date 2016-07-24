import { Component } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/components/typeahead';
import { Observable } from 'rxjs/Observable';

import { CustomerServiceService } from './customer-service/index';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-customers',
  templateUrl: 'customers.component.html',
  styleUrls: ['customers.component.css'],
  directives: [TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  providers: [CustomerServiceService]
})
export class CustomersComponent {
  public selected:string = '';
  public asyncSelected:string = '';
  public typeaheadLoading:boolean = false;
  public typeaheadNoResults:boolean = false;

  private _cache:any;
  private _prevContext:any;

  public constructor(private _customerService: CustomerServiceService) {}

  public getContext():any {
    return this;
  }

  public getAsyncData(context:any) : Function {
    if (this._prevContext === context) {
      return this._cache;
    }

    this._prevContext = context;

    let f:Function = () : Observable<string> =>  {
      let k = this._customerService.getCustomerList();
      console.log(k);
      return k;
    };

    console.log(f);
    console.log(typeof f);

    this._cache = f;

    return this._cache;
  }

  public changeTypeaheadLoading(e:boolean):void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e:boolean):void {
    this.typeaheadNoResults = e;
  }

  public typeaheadOnSelect(e:any):void {
    console.log(`Selected value: ${e.item}`);
  }
}
