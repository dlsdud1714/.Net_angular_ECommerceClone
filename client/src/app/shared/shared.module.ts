import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PaginationComponent } from './components/pagination/pagination.component'
import {CarouselModule} from 'ngx-bootstrap/carousel'

@NgModule({
  declarations: [
    PageHeaderComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule
  ], exports: [PaginationModule, PageHeaderComponent, PaginationComponent, CarouselModule]
})
export class SharedModule { }
