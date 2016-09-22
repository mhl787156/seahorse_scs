import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnChanges, SimpleChange, OnInit} from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/components/typeahead';

import { Customer } from '../../models/index';
import { CustomerServiceService } from '../customer-service/index';
import { AuthService } from '../../login/auth-service/index';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'customer-profile',
  templateUrl: 'customer-profile.component.html',
  styleUrls: [`

  `],
  directives: [TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  providers: [CustomerServiceService, AuthService]
})
export class CustomerProfileComponent implements AfterViewInit, OnChanges, OnInit{
  @Input() customerId: string;

  customer : Customer = new Customer();

  showOrders : boolean = false;
  buttonLabel : string = 'Edit Customer';

  @ViewChild('customer_form') customerFormRef: ElementRef;
  customerForm : HTMLFieldSetElement;

  constructor(private customerService: CustomerServiceService,
              private authservice: AuthService,
              private aroute: ActivatedRoute,
              private router: Router) {}

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    this.getCustomer(this.customerId);
  }

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

  ngAfterViewInit() {
    this.customerForm = this.customerFormRef.nativeElement;
    this.customerForm.disabled = true;
  }

  getCustomer(id: string) {
    if (id === undefined) {
      return;
    }
    this.customerService.getCustomer(id)
      .subscribe(
        res => {
          this.customer = res;
        },
        err => console.log(err),
        () => console.log('Get ' + id + ' Customer Request Completed')
      );
  }

  saveCustomer() {
    this.customer.active = true;
    this.customerService.updateCustomer(this.customer).subscribe(
      res => console.log,
      err => console.log(err),
      () => console.log('Post ' + this.customer.id + ' Customer Request Completed')
    );
  }

  toggleEditSave() {
    if(!this.customerForm.disabled){
      // Input saving logic heree
      console.log('Saving Customer:' , this.customer);
      this.saveCustomer();
    }
    this.customerForm.disabled = !this.customerForm.disabled;
    this.buttonLabel = this.customerForm.disabled ? 'Edit Customer' : 'Save Customer';

    //Must Check Admin rights on the current user
    // if(this.authservice.getCurrentUser().admin){
    //   this.customerForm.disabled = !this.customerForm.disabled;
    //   this.buttonLabel = this.customerForm.disabled ? 'Edit Customer' : 'Save Customer';
    // }
  }

  toggleOrders() {
    // Get Data from service
    if(!this.showOrders){
      console.log('Getting order Data from service');
    }
    this.showOrders = !this.showOrders;
  }
}

