import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/publishReplay';

import { Customer } from '../../models/index';

/**
 * This class provides the Login service with methods to read names and add names.
 */
@Injectable()
export class CustomerServiceService {

  Uri: string = 'http://localhost:80/';

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private authhttp: AuthHttp, private http: Http) {}

  /**
   * getCustomerList sends a HTTP GET request to the REST server
   * @return Observable<Response> with modified error handler and token as the data  
   */
  public getCustomerList(name: string, postcode:string) : Observable<any[]> {
    console.log('Getting customer list', name, postcode);
    return this.authhttp.get(this.Uri+'api/customer/list?name=' + name + '&postcode=' + postcode )
                  .map(res => res.json() || {})
  }


  /**
   * getCustomer sends a HTTP GET request to the REST server
   * @param id of the customer
   * @return Observable<Response> with modified error handler and token as the data  
   */
  public getCustomer(id : string) {
    console.log('Request', id)
    return this.authhttp.get(this.Uri+'api/customer/get/'+id)
                   .map(res => res.json() || {});
  }

  /**
   * newCustomer sends a HTTP GET request to the REST server to create a new user
   * @param -----
   * @return Observable<Response> with modified error handler and the customer ID
   */
  public newCustomer() : Observable<string> {
    return this.authhttp.get(this.Uri+'api/customer/new')
                    .map(res => res.json());
  }

  /**
   * updateCustomer sends a HTTP POST request to the REST server to update the selected customer
   * @param customer to update on the server
   * @result Observable<string> with return value
   */
  public updateCustomer(cus: Customer) : Observable<string> {
    return this.authhttp.post(this.Uri + 'api/customer/update', JSON.stringify(cus))
              .map(res => res.json() || {} );
  }

}

