import { Component } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/components/typeahead';
import { Observable } from 'rxjs/Observable';

import { CustomerServiceService } from './customer-service/index';
import { CustomerProfileComponent } from './customer-profile/index';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-customers',
  templateUrl: 'customers.component.html',
  styleUrls: ['customers.component.css'],
  directives: [TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, CustomerProfileComponent],
  providers: [CustomerServiceService]
})
export class CustomersComponent {
  public asyncSelectedName: string = '';
  public asyncSelectedPostcode:string = '';

  public dataSourceName: string[];
  public dataSourcePostcode: string[];

  public typeaheadLoading:boolean = false;
  public typeaheadNoResults:boolean = false;

  public customerSelected: boolean = false;
  public customerId: number;


  public constructor(private _customerService: CustomerServiceService) {
    this.getAsyncData();
  }

  public newCustomer(){
    this._customerService.newCustomer().subscribe(res => {
      console.log(res);
      //getCustomer(res)
    });
  }

  public getAsyncData() :void {
    this._customerService.getCustomerList().subscribe(res => {
      let dataSource = res.data;

      // Must filter by Name Order TODO
      this.dataSourceName = dataSource;

      // Must filter by PostCode TODO
      this.dataSourceName = dataSource;
    });
  }

  public changeTypeaheadLoading(e:boolean):void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e:boolean):void {
    this.typeaheadNoResults = e;
  }

  public typeaheadOnSelectName(e:any):void {
    console.log(`Selected Na me value: ${e.item}`);

    //Search through Orders by name, and request customer details by ID TODO
    this.customerId = 67897689;
    this.customerSelected = true;
  }

   public typeaheadOnSelectPostcode(e:any):void {
    console.log(`Selected Postcode value: ${e.item}`);

    //Search through Orders by Postcode, and request customer details by ID TODO
    this.customerId = 67897689;
    this.customerSelected = true;
  }
}
