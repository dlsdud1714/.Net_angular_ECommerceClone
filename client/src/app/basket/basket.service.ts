import { Basket } from './../shared/models/Basket';
import { Iproduct } from './../shared/models/Iproduct';
import { IBasket, IBasketItem } from '../shared/models/Basket';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + '/basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
      })
    )
  }
  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + "/basket", basket).subscribe((res: IBasket) => {
      this.basketSource.next(res);
      console.log("basket", basket)
    },
      error => {
        console.log(error);
      }
    )
  }

  getCurrentBasket(){
    console.log(this.basketSource);
    return this.basketSource.value
  }
  addItemToBasket(item:Iproduct, quantity=1){
    const itemToAdd: IBasketItem = this.mapProductItemTobasketItem(item, quantity);
    const basket: IBasket = this.getCurrentBasket()??this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }
  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity:number): IBasketItem[] {
    const index = items.findIndex(i=>i.id===itemToAdd.id);
    if(index===-1){
      items.push(itemToAdd);
    }else{
      items[index].quantity+=quantity;
    }
    return items;
  }
  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItemTobasketItem(item: Iproduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type:item.productType
    }
  }
}

