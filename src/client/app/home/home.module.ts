import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
// import { CustomerServiceService } from '../+customers/index';
// import { OrderService } from '../+orders/index';

@NgModule({
  imports: [CommonModule, SharedModule, FormsModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
//   providers: [CustomerServiceService, OrderService],
})
export class HomeModule { }
