import { Component, OnInit } from '@angular/core';
import {Bouquet, ProductsServiceService, BouquetInOrder} from '../../../products-service.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public ProductsService: ProductsServiceService) {
    console.log(this.ProductsService.GetBouquetsInOrder());
  }

  titles: string[] = ['', 'Title:', 'Description:', 'Count:', 'Cost:' ];

  ngOnInit() {
  }

  GetToTalSum(): number {
    const order: BouquetInOrder[] = this.ProductsService.GetBouquetsInOrder();
    let total = 0;
    for (const bouquetInOrder of order) {
      total += this.ProductsService.GetBouquetPrice(bouquetInOrder.id) * bouquetInOrder.amount;
    }
    return total;
  }

}

