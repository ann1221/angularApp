import {AfterContentInit, AfterViewChecked, Component, OnInit} from '@angular/core';
import {OrderUnit} from '../../../classes/OrderUnit';
import {DBService} from '../../../services/d-b.service';
import {CookieService} from 'ngx-cookie-service';
import {CookieServiceService} from '../../../services/cookie-service.service';
import {Bouquet} from '../../../classes/Bouquet';
import {newArray} from '@angular/compiler/src/util';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterContentInit {

  titles: string[] = ['', 'Название:', 'Описание:', 'Количество:', 'Цена:' ];
  order: OrderUnit[];
  localCatalog: Bouquet[];

  constructor(public dbService: DBService, public cookieService: CookieServiceService) {}
  ngOnInit() {
  }

  ngAfterContentInit(): void {
    console.log('AfterContentInit');
    this.initOrder();
    this.initLocalCatalog();
  }

  initOrder(){
    this.order = this.cookieService.buildOrder();
    console.log(this.order);
  }

  initLocalCatalog(){
    if (this.order.length > 0) {
      console.log(this.order);
      const ids: number[] = [];
      for (const orderUnit of this.order) {
        ids.push(orderUnit.bouquet_id);
      }
      this.dbService.getCatalogByIds(ids).subscribe(result => {
        this.localCatalog = result;
        console.log(result);
      });
    }
  }

  GetToTalSum(): number {
    let total = 0;
    for (const orderUnit of this.order) {
      total += this.getBouquetPrice(this.getBouquetById(orderUnit.bouquet_id)) * orderUnit.amount;
    }
    return total;
  }

  public getBouquetById(bouquetId: number): Bouquet {
    for (const bouquet of this.localCatalog) {
      if (bouquet.bouquet_id.toString() === bouquetId.toString()) {
        return (bouquet);
      }
    }
    return null;
  }

  public getBouquetPrice(bouquet: Bouquet) {
    let totalSum = 0;
    for (const prodInBouq of bouquet.productsInBouquet) {
      totalSum += prodInBouq.product.price * prodInBouq.amount;
    }
    return totalSum + bouquet.design_price;
  }

}

