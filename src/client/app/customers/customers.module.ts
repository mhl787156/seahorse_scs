import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { CustomersComponent } from './customers.component';

@NgModule({
  imports: [CommonModule, SharedModule, FormsModule], //<- Typeahead directives?
  declarations: [CustomersComponent],
  exports: [CustomersComponent],
//   providers: [CustomerServiceService, OrderService], 
})
export class CustomersModule { }
