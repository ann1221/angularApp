import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private CATALOG: Bouquet[];
  constructor(public cookieService: CookieService, public http: HttpClient, private snackBar: MatSnackBar) {
    this.http.get<Bouquet[]>('http://localhost:8080/getCatalog').subscribe(result => {
      this.CATALOG = result; console.log(this.CATALOG); });
  }

  public GetCatalog(): Bouquet[] {
    return this.CATALOG;
  }

  public SetCatalog() {
    this.http.get<Bouquet[]>('http://localhost:8080/getCatalog').subscribe(result => {
      this.CATALOG = result;
      console.log(this.CATALOG); });
  }


  public GetBouquetById(bouquetId: number): Bouquet {
    for (const bouquet of this.CATALOG) {
      if (bouquet.bouquet_id.toString() === bouquetId.toString()) {
        return (bouquet);
      }
    }
    return null;
  }

  public GetBouquetPrice(bouquetId: number) {
    const bouquet = this.GetBouquetById(bouquetId);
    let totalSum = 0;
    for (const prodInBouq of bouquet.productsInBouquet) {
      totalSum += prodInBouq.product.price * prodInBouq.amount;
    }
    return totalSum + bouquet.design_price;
  }

  public getOrder(): OrderUnit[] {
    const map: { [key: string]: string} = this.cookieService.getAll();
    const order: OrderUnit[] = [];
    for (const mapKey in map) {
      const key = mapKey.split('/');
      if (key[0] === 'bouq') {
        const orderUnit: OrderUnit = {bouquet_id: Number(key[1]), amount: Number(map[mapKey])};
        order.push(orderUnit);
      }
    }
    return order;
  }

  public getOrderLen(): number{
    return this.getOrder().length;
  }


  public CleanOrder() {
    const map: { [key: string]: string} = this.cookieService.getAll();
    for (const mapKey in map) {
      const key = mapKey.split('/');
      if (key[0] === 'bouq') {
        this.cookieService.delete(mapKey);
      }
    }
  }

  public GetAmountOfBouquet(bouquetId: number): number {
    const result = this.cookieService.get('bouq/' + bouquetId.toString());
    if (result.length > 0){
      return Number(result);
    }
    return 0;
  }

  public AddToOrder(bouquetId: number) {
    const result = this.cookieService.get('bouq/' + bouquetId.toString());
    const inStock = this.GetBouquetById(bouquetId).in_stock;
    if (result.length > 0){
      if (inStock > Number(result)) {
        this.cookieService.set('bouq/' + bouquetId.toString(),
          (Number(result) + 1).toString(),
          new Date(Date.now() + 86400e3) );
      } else {
        this.openSnackBar('Вы уже забрали все букеты, склад опустел', 'Ок', 3000);
      }
    } else {
      if (inStock > 0) {
        this.cookieService.set('bouq/' + bouquetId.toString(), '1',
          new Date(Date.now() + 86400e3));
      } else {
        this.openSnackBar('На данный момент букета нет на сладе', 'Ок', 3000);
      }
    }
  }

  public  SubstractFromOrder(bouquetId: number) {
    const result = this.cookieService.get('bouq/' + bouquetId.toString());
    if ( result.length === 0) {
      this.openSnackBar('Увы, вычитать уже нечего', 'Ок', 3000);
    } else {
      if (Number(result) > 0) {
        this.cookieService.set('bouq/' + bouquetId.toString(),
                                  (Number(result) - 1).toString(),
                                  new Date(Date.now() + 86400e3));
        if (Number(result) - 1 === 0) {
          this.cookieService.delete('bouq/' + bouquetId.toString());
        }
      } else {
        this.openSnackBar('Увы, вычитать уже нечего', 'Ок', 3000);
      }
    }
  }


  public SetAmountInOrder(bouquetId: number, value: number) {
    if (value <= 0){
      this.cookieService.delete('bouq/' + bouquetId.toString());
      console.log('asdfadfa');
      return;
    }
    if (this.GetBouquetById(bouquetId).in_stock > value) {
      this.cookieService.set('bouq/' + bouquetId.toString(), value.toString(),
        new Date(Date.now() + 86400e3));
    }
    else {
      this.openSnackBar('You already grabbed all this bouquet from stock..', 'okaay', 3000);
    }
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration,
    });
  }
}

export interface OrderUnit {
  bouquet_id: number;
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
