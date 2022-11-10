import { IProductType } from './../shared/models/IProductType';
import { IBrand } from './../shared/models/IBrand';
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
  brands: IBrand[];
  productTypes: IProductType[];
  typeIdSelected = 0;
  brandIdSelected = 0;
  sortSelected: string;
  sortOptions =
    [{ name: "Alphabetically", option: "name" },
    { name: "Price: high to low", option: "priceDesc" },
    { name: "Price: low to high", option: "priceAsc" }];

  constructor(private ShopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }
  onSortSelected(sort: string) {
    this.sortSelected = sort;
    console.log("sort", sort)
    this.getProducts();
  }
  getProducts() {
    this.ShopService.getProducts(this.brandIdSelected, this.typeIdSelected, this.sortSelected)
    .subscribe(res => {
      this.products = res.data;
    }, err => console.log(err))
  }
  getBrands() {
    this.ShopService.getBrands().subscribe(res => {
      this.brands = [{ id: 0, name: "All" }, ...res];
    }, err => console.log(err))
  }
  getTypes() {
    this.ShopService.getProductTypes().subscribe(res => {
      this.productTypes = [{ id: 0, name: "All" }, ...res];
    }, err => console.log(err))
  }


}
