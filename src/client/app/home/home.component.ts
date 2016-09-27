import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  newName: string;
  recentCustomers: DataCustomers[] = [];
  recentOrders: DataOrders[] = [];

  constructor(
    // public customerService: CustomerServiceService,
              // public orderService: OrderService,
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
    // this.customerService.getCustomerListFull()
    //   .subscribe(
    //       data => {
    //         this.recentCustomers = data;
    //       },
    //       err => console.log(err),
    //       () => console.log('Customer List Request Complete')
    //     ); 
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

