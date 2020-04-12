import { Component, Input, OnInit } from '@angular/core';

import {Bouquet, BouquetInOrder, ProductsServiceService} from '../../../../products-service.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {

  @Input() bouquetsInOrder: BouquetInOrder;
  @Input() bouquet: Bouquet;
  constructor(public ProductService: ProductsServiceService) {
  }

  ngOnInit() {

  }
}
