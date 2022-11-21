import { Basket, IBasket } from './../shared/models/Basket';
import { BasketService } from './basket.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket> ;
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
   this.basket$ = this.basketService.basket$;
  }

}
