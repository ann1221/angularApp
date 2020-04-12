import {Component, Input, OnInit} from '@angular/core';
import {Bouquet, ProductsServiceService} from '../../../../../products-service.service';
import { ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-prod-info',
  templateUrl: './prod-info.component.html',
  styleUrls: ['./prod-info.component.css']
})
export class ProdInfoComponent implements OnInit {
  bouquetId: number = this.activateRoute.snapshot.params.id;
  bouquet: Bouquet;
  amountInOrder: number = this.ProductsService.GetAmountInOrder(this.bouquetId);

  constructor(public ProductsService: ProductsServiceService,
              public activateRoute: ActivatedRoute,
              public http: HttpClient) {
    this.http.get<Bouquet>('http://localhost:8080/main/getBouquet?bouquetId=' + this.bouquetId.toString())
      .subscribe(result => {
        this.bouquet = result;
      });
  }
  ngOnInit() {
  }

  public ChangeAmountInOrder() {
    console.log(this.amountInOrder);
    console.log(this.ProductsService.GetBouquetsInOrder());
  }
}
