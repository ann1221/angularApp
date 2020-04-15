import {Component, Input, OnInit} from '@angular/core';
import {Bouquet, OrderService} from '../../../../order.service';


@Component({
  selector: 'app-catalog-product',
  templateUrl: './catalog-product.component.html',
  styleUrls: ['./catalog-product.component.css']
})
export class CatalogProductComponent implements OnInit {
  constructor(public orderService: OrderService) {
  }

  @Input() bouquet: Bouquet;
  ngOnInit() {
  }

  AddToCart() {
    this.orderService.AddToOrder(this.bouquet.bouquet_id);
  }

  DropFromCart() {
    this.orderService.SubstractFromOrder(this.bouquet.bouquet_id);
  }

  GetAmountInOrder(): number {
    return this.orderService.GetAmountOfBouquet(this.bouquet.bouquet_id);
  }

}
