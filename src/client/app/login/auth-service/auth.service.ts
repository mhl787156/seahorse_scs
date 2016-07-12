import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

/**
 * This class provides the Login service with methods to read names and add names.
 */
@Injectable()
export class AuthService {

  /**
   * Whether the log in was successful
   * @type {Array}
   */
  private loggedIn: boolean = false;

  /**
   * Contains the currently pending request.
   * @type {Observable<string[]>}
   */
  private request: Observable<string[]>;

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource. If there was a previous successful request
   * (the local names array is defined and has elements), the cached version is returned
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<string[]> {
    // if (this.names && this.names.length) {
    //   return Observable.from([this.names]);
    // }
    // if (!this.request) {
    //   this.request = this.http.get('/assets/data.json')
    //     .map((response: Response) => response.json())
    //     .map((data: string[]) => {
    //       this.request = null;
    //       return this.names = data;
    //     }).publishReplay(1).refCount();
    // }
    return this.request;
  }

  login(logininfo: {}): Observable<boolean> {
    //   this.http.post('', logininfo).map((response: Response) => response.json());
    this.loggedIn = true;
    console.log(logininfo);
    return Observable.from([this.loggedIn]);
  }

  isLoggedIn(): boolean {
      return this.loggedIn;
  }

}

