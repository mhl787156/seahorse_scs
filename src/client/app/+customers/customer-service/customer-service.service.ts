import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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

  public statesComplex:Array<any> = [
    {id: 1, name: 'Alabama'}, {id: 2, name: 'Alaska'}, {id: 3, name: 'Arizona'},
    {id: 4, name: 'Arkansas'}, {id: 5, name: 'California'},
    {id: 6, name: 'Colorado'}, {id: 7, name: 'Connecticut'},
    {id: 8, name: 'Delaware'}, {id: 9, name: 'Florida'},
    {id: 10, name: 'Georgia'}, {id: 11, name: 'Hawaii'},
    {id: 12, name: 'Idaho'}, {id: 13, name: 'Illinois'},
    {id: 14, name: 'Indiana'}, {id: 15, name: 'Iowa'},
    {id: 16, name: 'Kansas'}, {id: 17, name: 'Kentucky'},
    {id: 18, name: 'Louisiana'}, {id: 19, name: 'Maine'},
    {id: 21, name: 'Maryland'}, {id: 22, name: 'Massachusetts'},
    {id: 23, name: 'Michigan'}, {id: 24, name: 'Minnesota'},
    {id: 25, name: 'Mississippi'}, {id: 26, name: 'Missouri'},
    {id: 27, name: 'Montana'}, {id: 28, name: 'Nebraska'},
    {id: 29, name: 'Nevada'}, {id: 30, name: 'New Hampshire'},
    {id: 31, name: 'New Jersey'}, {id: 32, name: 'New Mexico'},
    {id: 33, name: 'New York'}, {id: 34, name: 'North Dakota'},
    {id: 35, name: 'North Carolina'}, {id: 36, name: 'Ohio'},
    {id: 37, name: 'Oklahoma'}, {id: 38, name: 'Oregon'},
    {id: 39, name: 'Pennsylvania'}, {id: 40, name: 'Rhode Island'},
    {id: 41, name: 'South Carolina'}, {id: 42, name: 'South Dakota'},
    {id: 43, name: 'Tennessee'}, {id: 44, name: 'Texas'},
    {id: 45, name: 'Utah'}, {id: 46, name: 'Vermont'},
    {id: 47, name: 'Virginia'}, {id: 48, name: 'Washington'},
    {id: 49, name: 'West Virginia'}, {id: 50, name: 'Wisconsin'},
    {id: 51, name: 'Wyoming'}];

  public states:Array<string> = ['Alabama', 'Alaska', 'Arizona', 'Arkansas',
    'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico',
    'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'];

    public customerExample: Customer = {
      id : 67897689,
      date_added : '13/06/09',
      firstname : 'asdasd',
      surname : 'asdassd',
      company_name : '',
      address : '',
      postcode : '',
      home_phone : '',
      mobile_phone : '',
      fax_number : '',
      email : 'bobobob@something.com',
      mailing : false,
      notes : 'Some Notes',
      orderids: ['45789864678', '8654579', '986569', '986546890']
    };

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
  public getCustomerList() : Observable<any> {
    // return this.authhttp.get(this.Uri+'customer/list/name')
    //               .map(res => res.json() || {})
    //               .catch(this.errorHandler);
    let j = Observable.of({
      data: this.states
    });
    return j;
  }


  /**
   * getCustomer sends a HTTP GET request to the REST server
   * @param id of the customer
   * @return Observable<Response> with modified error handler and token as the data  
   */
  public getCustomer(id : number) {
    // return this.authhttp.get(this.Uri+'customer/'+id)
    //                .map(res => res.json() || {})
    //                .catch(this.errorHandler);
    return Observable.of({customer : this.customerExample});
  }

  /**
   * newCustomer sends a HTTP GET request to the REST server to create a new user
   * @param -----
   * @return Observable<Response> with modified error handler and the customer ID
   */
  public newCustomer() {
    return this.authhttp.get(this.Uri+'api/customer/new')
                    .map(res => res.json() || {})
                    .map(res => console.log(res))
                    .catch(this.errorHandler)
    // return Observable.of({customer : this.customerExample});
  }

  /**
   * setPassword sends a HTTP POST request to REST server
   * @param Object containing a username and password both strings
   * @return Observable<Response> with modified error handler and token as the data
   */
  setPassword(logininfo: {}) {
    return this.http.post(this.Uri+'api/setpassword', JSON.stringify(logininfo))
                  .map(res => res.json())
                  .catch(this.errorHandler);
  }

  /**
   * errorHandler takes an error and translates the error code into human messages
   */
  errorHandler(error: any): Observable<string> {
    let errMsg = (error.message) ? error.message : '';
    switch(error.status) {
      case -1:
        errMsg = `${error.status} - ${error.statusText} Server Error`; break;
      case 400:
        errMsg = `Your Username has not been recognised`; break;
      case 401:
        errMsg = `You need to set your password, click the first time setup button at the bottom of the screen`; break;
      case 422:
        errMsg = `Your password does not match, please try again`; break;
      case 403:
        errMsg = `User password already set, please ask admin to reset`; break;
    }
    return Observable.throw(errMsg);
  }

}
