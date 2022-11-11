import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PaginationComponent } from './components/pagination/pagination.component'


@NgModule({
  declarations: [
    PageHeaderComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ], exports: [PaginationModule, PageHeaderComponent, PaginationComponent]
})
export class SharedModule { }
