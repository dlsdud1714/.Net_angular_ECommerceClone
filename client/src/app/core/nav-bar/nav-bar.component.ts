import { AccountService } from './../../account/account.service';
import { IBasket } from './../../shared/models/Basket';
import { Observable } from 'rxjs';
import { BasketService } from './../../basket/basket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket$ : Observable<IBasket>
  constructor(public basketService:BasketService, public accountservice: AccountService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

}
