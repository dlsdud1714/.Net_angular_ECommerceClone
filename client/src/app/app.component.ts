import { IPagination } from './shared/models/IPagination';
import { Iproduct } from './shared/models/Iproduct';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';

  
  constructor() {};

  ngOnInit(): void {
    
  }
}
