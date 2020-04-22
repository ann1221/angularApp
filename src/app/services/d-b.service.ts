import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Bouquet} from '../classes/Bouquet';
import {OrderUnit} from '../classes/OrderUnit';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DBService {

  private CATALOG: Bouquet[];
  baseURL = 'http://localhost:8080/';

  constructor(public cookieService: CookieService, public http: HttpClient, private snackBar: MatSnackBar) {
    this.http.get<Bouquet[]>('http://localhost:8080/bouquets').subscribe(result => {
      this.CATALOG = result; console.log(this.CATALOG); });
  }

  public getCatalog(): Observable<Bouquet[]> {
    return this.http.get<Bouquet[]>('http://localhost:8080/bouquets');
  }

  public getCatalogByIds(ids: number[]): Observable<Bouquet[]>{
    const parametrs = new HttpParams().set('bouquetsIdsJson', JSON.stringify(ids));
    return this.http.get<Bouquet[]>('http://localhost:8080/bouquets', {params: parametrs});
  }

  public getCatalogSlice(start: number, capacity: number): Observable<Bouquet[]>{
    return this.http.get<Bouquet[]>(this.baseURL + '/bouquets/' + start + '/' + capacity);
  }

  public getCatalogByProdName(prodName) {
    const parametrs = new HttpParams().set('prodName', prodName);
    return this.http.get<Bouquet[]>(this.baseURL + '/bouquets', {params: parametrs});
  }

  public GetBouquetById(bouquetId: number): Observable<Bouquet> {
    return this.http.get<Bouquet>('http://localhost:8080/bouquets/' + bouquetId);
  }

  public SetCatalog() {
    this.http.get<Bouquet[]>('http://localhost:8080/bouquets').subscribe(result => {
      this.CATALOG = result;
      console.log(this.CATALOG); });
  }

  public addClietnOrder(heads, body, parametrs){
    return this.http.post('http://localhost:8080/orders/create', body,
      {headers: heads, params: parametrs});
  }

  // public GetBouquetPrice(bouquet: Bouquet) {
  //   let totalSum = 0;
  //   for (const prodInBouq of bouquet.productsInBouquet) {
  //     totalSum += prodInBouq.product.price * prodInBouq.amount;
  //   }
  //   return totalSum + bouquet.design_price;
  // }

  // public getFullOrder(): OrderUnit[] {
  //   const map: { [key: string]: string} = this.cookieService.getAll();
  //   const order: OrderUnit[] = [];
  //   for (const mapKey in map) {
  //     const key = mapKey.split('/');
  //     if (key[0] === 'bouq') {
  //       const orderUnit: OrderUnit = {bouquet_id: Number(key[1]), amount: Number(map[mapKey])};
  //       order.push(orderUnit);
  //     }
  //   }
  //   return order;
  // }

  // public getBouqutCountInOrder(): number{
  //   return this.getFullOrder().length;
  // }

  // public CleanOrder() {
  //   const map: { [key: string]: string} = this.cookieService.getAll();
  //   for (const mapKey in map) {
  //     const key = mapKey.split('/');
  //     if (key[0] === 'bouq') {
  //       this.cookieService.delete(mapKey);
  //     }
  //   }
  // }

  // public GetAmountOfBouquet(bouquetId: number): number {
  //   const result = this.cookieService.get('bouq/' + bouquetId.toString());
  //   if (result.length > 0){
  //     return Number(result);
  //   }
  //   return 0;
  // }
  //
  // public AddToOrder(bouquet: Bouquet) {
  //   const result = this.cookieService.get('bouq/' + bouquet.bouquet_id.toString());
  //   const inStock = bouquet.in_stock;
  //   if (result.length > 0){
  //     if (inStock > Number(result)) {
  //       this.cookieService.set('bouq/' + bouquet.bouquet_id.toString(),
  //         (Number(result) + 1).toString(),
  //         new Date(Date.now() + 86400e3) );
  //     } else {
  //       this.openSnackBar('Вы уже забрали все букеты, склад опустел', 'Ок', 3000);
  //     }
  //   } else {
  //     if (inStock > 0) {
  //       this.cookieService.set('bouq/' + bouquet.bouquet_id.toString(), '1',
  //         new Date(Date.now() + 86400e3));
  //     } else {
  //       this.openSnackBar('На данный момент букета нет на сладе', 'Ок', 3000);
  //     }
  //   }
  // }
  //
  // public  SubstractFromOrder(bouquetId: number) {
  //   const result = this.cookieService.get('bouq/' + bouquetId.toString());
  //   if ( result.length === 0) {
  //     this.openSnackBar('Увы, вычитать уже нечего', 'Ок', 3000);
  //   } else {
  //     if (Number(result) > 0) {
  //       this.cookieService.set('bouq/' + bouquetId.toString(),
  //                                 (Number(result) - 1).toString(),
  //                                 new Date(Date.now() + 86400e3));
  //       if (Number(result) - 1 === 0) {
  //         this.cookieService.delete('bouq/' + bouquetId.toString());
  //       }
  //     } else {
  //       this.openSnackBar('Увы, вычитать уже нечего', 'Ок', 3000);
  //     }
  //   }
  // }
  //
  //
  // public SetAmountInOrder(bouquet: Bouquet, value: number) {
  //   if (value <= 0){
  //     this.cookieService.delete('bouq/' + bouquet.bouquet_id.toString());
  //     console.log('asdfadfa');
  //     return;
  //   }
  //   if (bouquet.in_stock >= value) {
  //     this.cookieService.set('bouq/' + bouquet.bouquet_id.toString(), value.toString(),
  //       new Date(Date.now() + 86400e3));
  //   }
  //   else {
  //     this.openSnackBar('You already grabbed all this bouquet from stock..', 'okaay', 3000);
  //   }
  // }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration,
    });
  }
}

