import { IProductType } from './../shared/models/IProductType';
import { IBrand } from './../shared/models/IBrand';
import { IPagination } from '../shared/models/IPagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/'

  constructor(private http:HttpClient) { }

  getProducts(brandId?: number, typeId?: number){
    let params = new HttpParams();
    if(brandId){
      params= params.append('brandId', brandId.toString())
    }
    if(typeId){
      params= params.append('typeId', typeId.toString())
    }
    return this.http.get<IPagination>(this.baseUrl+'products',{observe:'response', params})
    .pipe(
      map(res=> res.body)
    )
  }
  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl+"products/brands");
  }
  getProductTypes(){
    return this.http.get<IProductType[]>(this.baseUrl+"products/types");
  }
}
