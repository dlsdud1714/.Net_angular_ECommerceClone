import { CheckoutModule } from './../checkout/checkout.module';
import { SharedModule } from './../shared/shared.module';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [BasketComponent],
  imports: [
    CommonModule,
    BasketRoutingModule,
    SharedModule
  ],
  exports:[]
})
export class BasketModule { }
