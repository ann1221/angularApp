import {Component, Input, OnInit} from '@angular/core';
import {Bouquet, ProductsServiceService} from '../../../../products-service.service';


@Component({
  selector: 'app-catalog-product',
  templateUrl: './catalog-product.component.html',
  styleUrls: ['./catalog-product.component.css']
})
export class CatalogProductComponent implements OnInit {
  constructor(public ProductsService: ProductsServiceService) {
  }

  @Input() bouquet: Bouquet;
  ngOnInit() {
  }

  AddToCart() {
    this.ProductsService.AddToOrder(this.bouquet.bouquet_id);
  }

  DropFromCart() {
    this.ProductsService.SubstractFromOrder(this.bouquet.bouquet_id);
  }

  GetAmountInOrder(): number {
    return this.ProductsService.GetAmountInOrder(this.bouquet.bouquet_id);
  }

}
