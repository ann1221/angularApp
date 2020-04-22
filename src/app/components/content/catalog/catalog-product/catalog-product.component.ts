import {Component, Input, OnInit} from '@angular/core';
import {DBService} from '../../../../services/d-b.service';
import {Bouquet} from '../../../../classes/Bouquet';
import {CookieServiceService} from '../../../../services/cookie-service.service';


@Component({
  selector: 'app-catalog-product',
  templateUrl: './catalog-product.component.html',
  styleUrls: ['./catalog-product.component.css']
})
export class CatalogProductComponent implements OnInit {
  constructor(public dbService: DBService, public cookieService: CookieServiceService) {
  }

  @Input() bouquet: Bouquet;
  ngOnInit() {
  }

  AddToCart() {
    this.cookieService.addToOrder(this.bouquet);
  }

  DropFromCart() {
    this.cookieService.substractFromOrder(this.bouquet.bouquet_id);
  }

  getAmountInOrder(): number {
    return this.cookieService.getAmountOfBouquet(this.bouquet.bouquet_id);
  }
}
