import { ShopParams } from './../shared/models/ShopParams';
import { IProductType } from './../shared/models/IProductType';
import { IBrand } from './../shared/models/IBrand';
import { ShopService } from './shop.service';
import { Iproduct } from '../shared/models/Iproduct';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchRef: ElementRef;
  products: Iproduct[];
  brands: IBrand[];
  productTypes: IProductType[];
  shopParams = new ShopParams();
  count: number;
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
    this.shopParams.brandId = brandId
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    console.log("sort", sort)
    this.getProducts();
  }
  onPageSelected(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }
  onSearch() {
    this.shopParams.search = this.searchRef.nativeElement.value;
    console.log("search on", this.shopParams.search)
    this.getProducts();
  }
  onReset() {
    this.searchRef.nativeElement.value = "";
    this.shopParams = new ShopParams();
    this.getProducts();
  }
  getProducts() {
    this.ShopService.getProducts(this.shopParams)
      .subscribe(res => {
        this.products = res.data;
        this.count = res.count;
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
