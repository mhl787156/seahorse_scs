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

  public dataSourceList: CustomerListReturnType[];

  public dataSourceName: string[];
  public dataSourcePostcode: string[];

  public typeaheadLoading:boolean = false;
  public typeaheadNoResults:boolean = false;

  public customerSelected: boolean = false;
  public customerId: string;


  public constructor(private _customerService: CustomerServiceService) {
    this.update();
  }

  public update() {
    this.getAsyncData();
  }

  public newCustomer(){
    this._customerService.newCustomer()
          .subscribe(
            data => {
              console.log('data', data);
              this.customerId = data;
              this.customerSelected = true;
            },
            err => console.log(err),
            () => console.log('New Customer Request Complete')
          );
  }

  public getAsyncData() :void {
    this._customerService.getCustomerList(this.asyncSelectedName, this.asyncSelectedPostcode)
      .subscribe(res => {
        let names = res.map(x => x.firstname + ' ' + x.surname);

        // Store the current list, so id can be looked up.
        this.dataSourceList = res;

        // Must filter by Name Order TODO
        this.dataSourceName = names;

        // Must filter by PostCode TODO
        this.dataSourcePostcode = res.map(x => x.postcode);
      });
  }

  public changeTypeaheadLoading(e:boolean):void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e:boolean):void {
    this.typeaheadNoResults = e;
  }

  public typeaheadOnSelectName(e:any):void {
    console.log(`Selected Name value: ${e.item}`);

    //Search through Orders by name, and request customer details by ID TODO
    let val = e.item.split(' ');
    if(val.length === 0) {
      return;
    }

    let person = this.dataSourceList.find((elem) => {
      let c1 = elem.firstname === val[0];
      let c2 = val.length === 1 ? true : elem.surname === val[1];
      return c1 && c2;
    });

    this.customerId = person.id;
    this.customerSelected = true;
  }

   public typeaheadOnSelectPostcode(e:any):void {
    console.log(`Selected Postcode value: ${e.item}`);

    //Search through Orders by Postcode, and request customer details by ID TODO
    let person = this.dataSourceList.find(elem => {
      return elem.postcode === e.item;
    })
    this.customerId = person.id;
    this.customerSelected = true;
  }
}

interface CustomerListReturnType {
  id: string;
  firstname: string;
  surname: string;
  postcode: string;
}
