import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { CustomerServiceService } from '../+customers/index';
import { OrderService } from '../+orders/index';

import { AuthGuardService } from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [AuthGuardService, CustomerServiceService, OrderService],
  directives: [REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class HomeComponent implements OnInit{
  newName: string;

  recentCustomers: DataCustomers[];

  recentOrders: DataOrders[];

  constructor(private customerService: CustomerServiceService,
              private orderService: OrderService,
              private router: Router) {}

  /**
   * Populates all the tables
   */
  ngOnInit() {
    this.getRecentCustomers();
    this.getRecentOrders();
  }

  /**
   * Gets the list of Recent Customers and populates the list;
   */
  getRecentCustomers() {
    this.customerService.getCustomerListFull()
      .subscribe(
          data => {
            console.log('data', data);
            this.recentCustomers = data;
          },
          err => console.log(err),
          () => console.log('New Customer Request Complete')
        );
  }

  getRecentOrders() {
    return;
  }

  onCustomerClick(cus:DataCustomers) {
    this.router.navigate(['/customers', cus.id]);
  }

}


interface DataCustomers {
  id: string;
  firstname: string;
  surname: string;
  postcode: string;
}

interface DataOrders {

}

