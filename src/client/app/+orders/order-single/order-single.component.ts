import { Component, Input, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/components/typeahead';

import { Customer } from '../../models/index';
import { OrderService } from '../order-service/index';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'order-single',
  templateUrl: 'order-single.component.html',
  styleUrls: [`

  `],
  directives: [TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
})
export class CustomerProfileComponent implements AfterViewInit {
  @Input() orderId: number;

  customer : Customer = new Customer();

  showOrders : boolean = false;
  buttonLabel : string = 'Edit Customer';

  @ViewChild('customer_form') customerFormRef: ElementRef;
  customerForm : HTMLFieldSetElement;

  constructor(private orderservice: OrderService) {
    this.getCustomer();
  }

  ngAfterViewInit() {
    this.customerForm = this.customerFormRef.nativeElement;
    this.customerForm.disabled = true;
  }

  getCustomer(){
    // this.customerService.getCustomer(this.customerId).subscribe( res => {
    //   this.customer = res.customer;
    // });
  }

  toggleEditSave() {

    if(!this.customerForm.disabled){
      // Input saving logic here
      console.log('Saving Customer:' , this.customer);
    }

    //Must Check Admin rights on the current user
    this.customerForm.disabled = !this.customerForm.disabled;
    this.buttonLabel = this.customerForm.disabled ? 'Edit Customer' : 'Save Customer';
  }

  toggleOrders() {
    // Get Data from service
    if(!this.showOrders){
      console.log('Getting order Data from service');
    }
    this.showOrders = !this.showOrders;
  }
}

