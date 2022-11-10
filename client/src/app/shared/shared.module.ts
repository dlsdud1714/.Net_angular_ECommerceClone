import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PageHeaderComponent } from './components/page-header/page-header.component'


@NgModule({
  declarations: [
    PageHeaderComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ], exports: [PaginationModule, PageHeaderComponent]
})
export class SharedModule { }
