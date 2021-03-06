import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnChanges, SimpleChange, OnInit} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Customer } from '../../models/index';
import { CustomerService } from '../customer-service/index';

/**
 * This class represents the lazy loaded Customer Profile Component.
 */
@Component({
  moduleId: module.id,
  selector: 'customer-profile',
  templateUrl: 'customer-profile.component.html',
  styleUrls: [`

  `],
  providers: [CustomerService]
})
export class CustomerProfileComponent implements AfterViewInit, OnChanges, OnInit {
  @Input() customerId: string;

  customer : Customer = new Customer();

  showOrders : boolean = false;
  buttonLabel : string = 'Edit Customer';

  @ViewChild('customer_form') customerFormRef: ElementRef;
  customerForm : HTMLFieldSetElement;

  /**
   * @param customerSerivce which provides the data service
   * @param authservice provides the authentication service
   * @param aroute is current Activated Router
   * @param router
   */
  constructor(private customerService: CustomerService,
              private aroute: ActivatedRoute,
              private router: Router) {}

  /**
   * Run on any change of the customer, the customer is updated.
   */
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    this.getCustomer(this.customerId);
  }

  /**
   * On initiation the parameters are read and the id retrieved.
   */
  ngOnInit() {
    this.aroute.params.forEach((params: Params) => {
     let id = params['id'];
     if(id === undefined) {
       console.log('no id params, loading general');
       return;
     }
     this.customerId = id;
     this.getCustomer(id);
   });
  }

  /**
   * Run after the form has been created, so as to disable input by default
   */
  ngAfterViewInit() {
    this.customerForm = this.customerFormRef.nativeElement;
    this.customerForm.disabled = true;
  }

  /**
   * getCustomer retrieves from the server, the customer with id of id
   * @param id: the id of the customer to retrieve.
   */
  getCustomer(id: string) {
    if (id === undefined) {
      return;
    }
    this.customerService.getCustomer(id)
      .subscribe(
        res => {
          this.customer = res;
          this.customer.last_viewed = Date.now();
        },
        err => console.log(err),
        () => console.log('Get ' + id + ' Customer Request Completed')
      );
  }

  /**
   * saveCustomer pushes all changes to the local customer to the server.
   */
  saveCustomer() {
    this.customer.active = true;
    this.customer.last_viewed = Date.now();
    this.customerService.updateCustomer(this.customer).subscribe(
      res => console.log,
      err => console.log(err),
      () => console.log('Post ' + this.customer.id + ' Customer Request Completed')
    );
  }

  /**
   * Toggles the input.
   * Default mode disables all form editing and is just for display
   * Admin or special users will be able to edit the user's details.
   * After editing, the button is pressed again to save the new user details.
   */
  toggleEditSave() {
    if(!this.customerForm.disabled){
      // Input saving logic heree
      console.log('Saving Customer:' , this.customer);
      this.saveCustomer();
    }
    this.customerForm.disabled = !this.customerForm.disabled;
    this.buttonLabel = this.customerForm.disabled ? 'Edit Customer' : 'Save Customer';

    //Must Check Admin rights on the current user
    //On Login store user (shaved user) object into localstorage
  }

  /**
   * Retreives Orders of the currently selected customer.
   * Displays them on screen which will be available to press.
   */
  toggleOrders() {
    // Get Data from service
    if(!this.showOrders){
      console.log('Getting order Data from service');
    }
    this.showOrders = !this.showOrders;
  }

}

