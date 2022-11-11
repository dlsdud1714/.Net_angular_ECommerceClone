import { ShopService } from './../shop.service';
import { Iproduct } from './../../shared/models/Iproduct';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Iproduct;

  constructor(private shopService: ShopService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct() {
    this.shopService.getProduct(+this.activeRoute.snapshot.paramMap.get('id'))
      .subscribe(res => this.product = res, err => {
        console.log(err)
      })
  }

}
