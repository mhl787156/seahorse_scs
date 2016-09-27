import { Component, OnInit } from '@angular/core';
// import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/components/typeahead';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CustomerService } from './customer-service/index';

/**
 * This Component represents the customer find component.
 * Also acts as the frame for the profile componet which displays a customers data.
 * 
 * Includes a dynamic selection box for choosing/ searching for a customer.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-customers',
  templateUrl: 'customers.component.html',
  styleUrls: ['customers.component.css'],
  // directives: [TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, CustomerProfileComponent],
  providers: [CustomerService]
})
export class CustomersComponent implements OnInit{
  public asyncSelectedName: string = '';
  public asyncSelectedPostcode:string = '';

  public dataSourceList: CustomerListReturnType[];

  public dataSourceName: string[];
  public dataSourcePostcode: string[];

  public typeaheadLoading:boolean = false;
  public typeaheadNoResults:boolean = false;

  public customerSelected: boolean = false;
  public customerId: string;

  /**
   * Constructor. Sets up the routers for use, and populates the dynamic lookup
   * @param customerService: provides the customer service service for use
   * @param aroute: provides access to the URL parameter
   * @param router: provides access to the Router to route on customer ID
   */
  public constructor(private customerService: CustomerService,
                     private aroute: ActivatedRoute,
                     private router: Router) {
    this.update();
  }

  /**
   * ngOnInit required as this class implements the OnInit interface
   * We check for the existance of a URL parameter which represents the ID of a customer
   * If no id is given, nothing is loaded, and a message logged,
   * If Id is given, we pass it as a paremeter to the profile component to populate the view.
   */
  public ngOnInit() {
    this.aroute.params.forEach((params: Params) => {
     let id = params['id'];
     if(id === undefined) {
       console.log('no id params, loading general');
       return;
     }
    //  this.customerId = id;
     this.customerSelected = true;
   });
  }

  /**
   * update populates the dynamic search bars with up to date information
   */
  public update() {
    this.getAsyncData();
  }

  /**
   * newCustomer asynchronously gets a new customer from the server.
   * A new Customer is created on the server
   */
  public newCustomer(){
    this.customerService.newCustomer()
          .subscribe(
            data => {
              console.log('data', data);
              this.customerId = data;
              this.customerSelected = true;
              this.router.navigate(['/customers', this.customerId]);
            },
            err => console.log(err),
            () => console.log('New Customer Request Complete')
          );
  }

  /**
   * getAsyncData gets the list of customers from the server
   */
  public getAsyncData() :void {
    this.customerService.getCustomerList(this.asyncSelectedName, this.asyncSelectedPostcode)
      .subscribe(res => {
        let names = res.map(x => x.firstname + ' ' + x.surname);
        console.log(names);

        // Store the current list, so id can be looked up.
        this.dataSourceList = res;

        // Must filter by Name Order TODO
        this.dataSourceName = names;

        // Must filter by PostCode TODO
        this.dataSourcePostcode = res.map(x => x.postcode);
      });
  }

  /**
   * typeahead loading
   */
  public changeTypeaheadLoading(e:boolean):void {
    this.typeaheadLoading = e;
  }

  /**
   * typeahead no results
   */
  public changeTypeaheadNoResults(e:boolean):void {
    this.typeaheadNoResults = e;
  }

  /**
   * typeahead what happens when a name is selected
   */
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

    this.navigateToId(person.id);
  }

  /**
   * typeahead what happens when a postcode is selected
   */
   public typeaheadOnSelectPostcode(e:any):void {
    console.log(`Selected Postcode value: ${e.item}`);

    //Search through Orders by Postcode, and request customer details by ID TODO
    let person = this.dataSourceList.find(elem => {
      return elem.postcode === e.item;
    });

    this.navigateToId(person.id);
  }

  /**
   * Navigate to a customers information page.
   */
  public navigateToId(id: string) {
    this.router.navigate(['/customers', id]);
  }
}

/**
 * The format of the list that is returned from the server.
 */
interface CustomerListReturnType {
  id: string;
  firstname: string;
  surname: string;
  postcode: string;
}
