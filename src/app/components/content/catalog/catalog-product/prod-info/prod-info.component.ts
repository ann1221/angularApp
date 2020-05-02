import {Component, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Bouquet} from '../../../../../classes/Bouquet';
import {DBService} from '../../../../../services/d-b.service';
import {CookieServiceService} from '../../../../../services/cookie-service.service';

@Component({
  selector: 'app-prod-info',
  templateUrl: './prod-info.component.html',
  styleUrls: ['./prod-info.component.css']
})

export class ProdInfoComponent implements OnInit {
  bouquetId: number = this.activateRoute.snapshot.params.id;
  bouquet: Bouquet;
  amountInOrder: string = this.cookieService.getAmountOfBouquet(this.bouquetId).toString();

  constructor(public dbService: DBService,
              public activateRoute: ActivatedRoute, private cookieService: CookieServiceService) {
    this.dbService.GetBouquetById(this.bouquetId).subscribe(result => {
        this.bouquet = result[0];
        console.log(this.bouquet);
      });
  }

  makeArray(finish: number) {
    const numbers = [];
    for (let i = 0; i <= finish; i++){
      numbers.push(i);
    }
    return numbers;
  }

  itemChanged(value: number) {
     this.cookieService.setAmountInOrder(this.bouquet, value);
  }

  ngOnInit() {
  }

  public getBouquetPrice() {
    let totalSum = 0;
    for (const prodInBouq of this.bouquet.productsInBouquet) {
      totalSum += prodInBouq.product.price * prodInBouq.amount;
    }
    return totalSum + this.bouquet.designPrice;
  }

}
