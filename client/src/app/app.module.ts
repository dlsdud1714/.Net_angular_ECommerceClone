import { CheckoutModule } from './checkout/checkout.module';
import { BasketModule } from './basket/basket.module';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { ShopModule } from './shop/shop.module';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import{HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BasketComponent } from './basket/basket.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    HomeModule,
    BasketModule,
    CheckoutModule,
    NgxSpinnerModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true },
    {provide: HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi:true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
