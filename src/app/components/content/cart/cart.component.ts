import { Component, OnInit } from '@angular/core';
import {Bouquet, OrderService, OrderUnit} from '../../../order.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  constructor(public orderService: OrderService) {
  }


  titles: string[] = ['', 'Название:', 'Описание:', 'Количество:', 'Цена:' ];


  GetToTalSum(): number {
    const order: OrderUnit[] = this.orderService.getOrder();
    let total = 0;
    for (const bouquetInOrder of order) {
      total += this.orderService.GetBouquetPrice(bouquetInOrder.bouquet_id) * bouquetInOrder.amount;
    }
    return total;
  }


  ngOnInit() {
  }


}

