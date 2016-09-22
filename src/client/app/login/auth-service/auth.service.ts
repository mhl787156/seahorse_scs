import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/publishReplay';

/**
 * This class provides the Login service with methods to read names and add names.
 */
@Injectable()
export class AuthService {

  private Uri: string = 'http://localhost:80/';

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private authhttp: AuthHttp, private http: Http) {}

  /**
   * Login sends a HTTP POST request to the REST server
   * Sets the value of the current user to access from other locations
   * @param Object containing a username and password both strings
   * @return Observable<Response> with modified error handler and token as the data  
   */
  login(logininfo: {}) {
    return this.http.post(this.Uri+'api/login', JSON.stringify(logininfo))
                  .map(res => res.json())
                  .catch(this.errorHandler)
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

export interface ILogin {
  username: string;
  password: string;
}

export interface IToken {
  user: string;
  token: string;
}
