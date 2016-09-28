import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  async
} from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http, HttpModule
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { CustomerService } from '../customer-service/index';
import { CustomerProfileComponent } from './customer-profile.component';

export function main() {
  describe('Customer Profile component', () => {
    // setting module for testing
    // Disable old forms
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, RouterModule, HttpModule, CustomerProfileComponent],
        declarations: [TestComponent],
        providers: [
          CustomerService,
          BaseRequestOptions,
          MockBackend,
          {provide: Http, useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
              return new Http(backend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
          },
        ]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();

            let cpInstance = fixture.debugElement.children[0].componentInstance;
            let cpDOMEl = fixture.debugElement.children[0].nativeElement;

            expect(cpInstance.customerService).toEqual(jasmine.any(CustomerService));
            // expect(homeDOMEl.querySelectorAll('li').length).toEqual(0);

            // homeInstance.newName = 'Minko';
            // homeInstance.addName();

            fixture.detectChanges();

            // expect(homeDOMEl.querySelectorAll('li').length).toEqual(1);
            // expect(homeDOMEl.querySelectorAll('li')[0].textContent).toEqual('Minko');
          });

      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-home></sd-home>'
})
class TestComponent { }