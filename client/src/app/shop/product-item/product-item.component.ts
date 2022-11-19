import { BasketService } from './../../basket/basket.service';
import { Iproduct } from '../../shared/models/Iproduct';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Iproduct;
  constructor(private basketService: BasketService) { }
  
  ngOnInit(): void {
  }
  addItemToBasket(){
    this.basketService.addItemToBasket(this.product);
  }
}
