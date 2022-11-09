import { IPagination } from './models/IPagination';
import { Iproduct } from './models/Iproduct';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  products:Iproduct[];
  
  constructor(private http: HttpClient) {};

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/products?pageSize=50').subscribe((response: IPagination)=>{
    console.log(response)  
    this.products = response.data;
    },error=>{
      console.log(error);
    });
  }
}
