import { ShopParams } from './../shared/models/ShopParams';
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

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.brandId != 0) {
      params = params.append('brandId', shopParams.brandId.toString())
    }
    if (shopParams.typeId != 0) {
      params = params.append('typeId', shopParams.typeId.toString())
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());


    return this.http.get<IPagination>(this.baseUrl + 'products', { observe: 'response', params })
      .pipe(
        map(res => res.body)
      )
  }
  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + "products/brands");
  }
  getProductTypes() {
    return this.http.get<IProductType[]>(this.baseUrl + "products/types");
  }
}
