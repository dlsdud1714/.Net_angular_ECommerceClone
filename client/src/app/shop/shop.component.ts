import { ShopService } from './shop.service';
import { Iproduct } from '../shared/models/Iproduct';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: Iproduct[];

  constructor(private ShopService: ShopService) { }

  ngOnInit(): void {
    this.ShopService.getProducts().subscribe(res=>{
      this.products = res.data;
    },err=>console.log(err))
  }

}
