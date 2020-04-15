import { Component, Input, OnInit } from '@angular/core';

import {Bouquet, OrderUnit, OrderService} from '../../../../order.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {


  @Input() orderUnit: OrderUnit;
  @Input() bouquet: Bouquet;
  constructor(public orderService: OrderService) {
  }

  ngOnInit() {

  }

}
