import { Component, Input, OnInit } from '@angular/core';

import {Bouquet} from '../../../../classes/Bouquet';
import {OrderUnit} from '../../../../classes/OrderUnit';
import {DBService} from '../../../../services/d-b.service';


@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {

  @Input() orderUnit: OrderUnit;
  @Input() bouquet: Bouquet;
  constructor(public orderService: DBService) {
  }

  ngOnInit() {
  }

  public getBouquetPrice(bouquet: Bouquet) {
    let totalSum = 0;
    for (const prodInBouq of bouquet.productsInBouquet) {
      totalSum += prodInBouq.product.price * prodInBouq.amount;
    }
    return totalSum + bouquet.design_price;
  }
}
