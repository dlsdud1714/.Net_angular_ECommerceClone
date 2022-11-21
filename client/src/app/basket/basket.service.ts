import { IBasket, Basket, IBasketTotal, IBasketItem } from './../shared/models/Basket';
import { Iproduct } from './../shared/models/Iproduct';
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
  
  private basketTotalSource = new BehaviorSubject<IBasketTotal>(null);
  basketTotal$ = this.basketTotalSource.asObservable();
  
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  
  getBasket(id: string) {
    return this.http.get(this.baseUrl + '/basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotal()
        console.log("Getting current basket", this.getCurrentBasket())
      })
    )
  }
  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + "/basket", basket).subscribe((res: IBasket) => {
      this.basketSource.next(res);
      this.calculateTotal();
      console.log("Setting current basket", this.getCurrentBasket())
    },
      error => {
        console.log(error);
      }
    )
  }
  deleteBasket(basket: IBasket){
    return this.http.delete(this.baseUrl+"/basket?id="+basket.id).subscribe(()=>{
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket.id')
    },error=>console.log(error))
  }
  getCurrentBasket(){
    return this.basketSource.value
  }
  increaseItemQuantity(item: IBasketItem){
    const basket = this.getCurrentBasket();
    const foundIndex = basket.items.findIndex(i=>i.id === item.id);
    basket.items[foundIndex].quantity++;
    this.setBasket(basket) 
  }
  decreaseItemQuantity(item: IBasketItem){
    const basket = this.getCurrentBasket();
    const foundIndex = basket.items.findIndex(i=>i.id === item.id);
    if(basket.items[foundIndex].quantity>1){
      basket.items[foundIndex].quantity--;
      this.setBasket(basket) 
    }else{
      this.removeItemFromBasket(item)
    }
  }
  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasket();
    if(basket.items.some(i=>i.id === item.id)){
      basket.items = basket.items.filter(i=>i.id!==item.id);
      if(basket.items.length>0){
        this.setBasket(basket)
      }else{
        this.deleteBasket(basket);
      }
    }
  }

  addItemToBasket(item:Iproduct, quantity=1){
    const itemToAdd: IBasketItem = this.mapProductItemTobasketItem(item, quantity);
    const basket: IBasket = this.getCurrentBasket()??this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  private calculateTotal(){
    const basket = this.getCurrentBasket();
    const shipping =0;
    const subTotal = basket.items.reduce((a,b)=>b.price*b.quantity+a,0);
    const total = subTotal+shipping
    this.basketTotalSource.next({subTotal, shipping, total} );
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

