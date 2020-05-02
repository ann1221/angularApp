import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {OrderUnit} from '../classes/OrderUnit';
import {Bouquet} from '../classes/Bouquet';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CookieServiceService {

  constructor(public cookieService: CookieService, private snackBar: MatSnackBar) { }

  public buildOrder(): OrderUnit[] {
    const map: { [key: string]: string} = this.cookieService.getAll();
    const order: OrderUnit[] = [];
    for (const mapKey in map) {
      const key = mapKey.split('/');
      if (key[0] === 'bouq') {
        const orderUnit: OrderUnit = {bouquetId: Number(key[1]), amount: Number(map[mapKey])};
        order.push(orderUnit);
      }
    }
    return order;
  }

  public getBouqutCountInOrder(): number{
    return this.buildOrder().length;
  }

  public cleanOrder() {
    const map: { [key: string]: string} = this.cookieService.getAll();
    for (const mapKey in map) {
      const key = mapKey.split('/');
      if (key[0] === 'bouq') {
        this.cookieService.delete(mapKey);
      }
    }
  }

  public addToOrder(bouquet: Bouquet) {
    const result = this.cookieService.get('bouq/' + bouquet.bouquetId.toString());
    const inStock = bouquet.in_stock;
    if (result.length > 0){
      if (inStock > Number(result)) {
        this.cookieService.set('bouq/' + bouquet.bouquetId.toString(),
          (Number(result) + 1).toString(),
          new Date(Date.now() + 86400e3) );
      } else {
        this.openSnackBar('Вы уже забрали все букеты, склад опустел', 'Ок', 3000);
      }
    } else {
      if (inStock > 0) {
        this.cookieService.set('bouq/' + bouquet.bouquetId.toString(), '1',
          new Date(Date.now() + 86400e3));
      } else {
        this.openSnackBar('На данный момент букета нет на сладе', 'Ок', 3000);
      }
    }
  }

  public  substractFromOrder(bouquetId: number) {
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

  public setAmountInOrder(bouquet: Bouquet, value: number) {
    if (value <= 0){
      this.cookieService.delete('bouq/' + bouquet.bouquetId.toString());
      console.log('asdfadfa');
      return;
    }
    if (bouquet.in_stock >= value) {
      this.cookieService.set('bouq/' + bouquet.bouquetId.toString(), value.toString(),
        new Date(Date.now() + 86400e3));
    }
    else {
      this.openSnackBar('You already grabbed all this bouquet from stock..', 'okaay', 3000);
    }
  }

  public getAmountOfBouquet(bouquetId: number): number {
    const result = this.cookieService.get('bouq/' + bouquetId.toString());
    if (result.length > 0){
      return Number(result);
    }
    return 0;
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration,
    });
  }

}
