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

import { User } from '../../models/index';

/**
 * This class provides the Login service with methods to read names and add names.
 */
@Injectable()
export class AdminService {

  Uri: string = 'http://localhost:80/';

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private authhttp: AuthHttp, private http: Http) {}

  /**
   * createNewUser sends a HTTP POST request to the REST server with the details of a new System user
   * @param {User} user - The new system user we are adding to the database
   * @return Observable<Resposnse> with error handler.
   */
  public createNewUser(user: User) : Observable<string> {
    console.log('Creating a new user');
    return this.authhttp.post(this.Uri+'api/admin/newuser', JSON.stringify(user))
                .map(res => res.json() || {});
  }

  /**
   * getUser sends a HTTP get request to the REST server to request the details of a user.
   * @param {string} id - The Id of the User we are requesting
   * @return Observable<User> contains a users details.
   */
  public getUser(id: string) : Observable<User> {
    console.log('Getting user from server:', id);
    return this.authhttp.get(this.Uri+'api/admin/getUser/'+id)
                .map(res => res.json() || {});
  }

  /**
   * makeAdmin sends a HTTP Post request to the REST server requesting targetId be made an Admin by requestId
   * The request contains a custom object with the id and target ids.
   * @param {string} requestId - The Id of the User who is posting the request
   * @param {string} targetId - The Id of the User who is requesting admin status
   * @return Observable<Response> with error handler 
   */
  public makeAdmin(requestId:string, targetId:string) : Observable<string>{
    console.log(requestId, 'making', targetId, 'an admin');
    return this.authhttp.post(this.Uri+'api/admin/makeadmin', JSON.stringify({
      id: requestId,
      target: targetId,
    })).map(res => res.json() || {});
  }


}

