import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class ProductsServiceService {
  constructor(public cookieService: CookieService) {
    console.log(this.cookieService.getAll());
    const obj = this.cookieService.getAll().toString().split(', ');
    console.log(obj.toString());
  }

  private CATALOG: Bouquet[] = [];
  private bouquetInOrder: BouquetInOrder[] = [];

  public GetBouquetsInOrder(){
    return null;
  }

  public SetCatalog(bouquets: Bouquet[]) {
    this.CATALOG = bouquets;
  }

  public GetCatalog(): Bouquet[] {
    return this.CATALOG;
  }

  public GetLenOrder(): number{
    const cookie = this.cookieService.getAll();
    if (cookie === null) {
      return 0;
    } else {
      return cookie.toString().split(';').length;
    }
  }

  public GetAmountInOrder(bouquetId: number): number {
    const result = this.cookieService.get('bouq/' + bouquetId.toString());
    if (result.length > 0){
      return Number(result);
    }
    return null;
  }

  public GetBouquetById(bouquetId: number): Bouquet {
    for (const bouquet of this.CATALOG) {
      if (bouquet.bouquet_id.toString() === bouquetId.toString()) {
        return (bouquet);
      }
    }
    return null;
  }


  public AddToOrder(bouquetId: number) {
    const result = this.cookieService.get('bouq/' + bouquetId.toString());
    const inStock = this.GetBouquetById(bouquetId).in_stock;
    if (result.length > 0){
      if (inStock > Number(result)){
        this.cookieService.set('bouq/' + bouquetId.toString(),
                                 (Number(result) + 1).toString(),
                                  new Date(Date.now() + 86400e3) );
      } else {
        alert('That\'s all, you are grabbed all bouquets from stock' );
      }
    } else {
      if (inStock >= 1){
        this.cookieService.set('bouq/' + bouquetId.toString(), '1',
                                new Date(Date.now() + 86400e3));
      } else {
        alert('There are no such bouquets in stock');
      }
    }
  }

  public  SubstractFromOrder(bouquetId: number) {
    const result = this.cookieService.get('bouq/' + bouquetId.toString());
    if ( result.length === 0) {
      alert('Nothing to substract');
    } else {
      if (Number(result) > 0) {
        this.cookieService.set('bouq/' + bouquetId.toString(),
                                  (Number(result) - 1).toString(),
                                  new Date(Date.now() + 86400e3));
        if (Number(result) - 1 === 0) {
          this.cookieService.delete('bouq/' + bouquetId.toString());
        }
      } else {
        alert('Nothing to substract');
      }
    }
  }

  public SetAmountInOrder(bouquetId: number, value: number) {
    this.cookieService.set('bouq/' + bouquetId.toString(), value.toString(),
                            new Date(Date.now() + 86400e3));
  }

  public GetBouquetPrice(bouquetId: number) {
    const bouquet = this.GetBouquetById(bouquetId);
    let totalSum = 0;
    for (const prodInBouq of bouquet.productsInBouquet) {
      totalSum += prodInBouq.product.price;
    }
    return totalSum + bouquet.design_price;
  }

}

export interface BouquetInOrder {
  id: number;
  amount: number;
}

export interface Bouquet {
  bouquet_id: number;
  name: string;
  design_price: number;
  pict_url: string;
  description: string;
  productsInBouquet: ProdInBouquet[];
  in_stock: number;
}

export interface ProdInBouquet {
  product: Product;
  amount: number;
}

export interface Product {
  prod_id: number;
  name: string;
  price: number;
  productType: ProductType;
}

export interface ProductType {
  type_id: number;
  name: string;
}
