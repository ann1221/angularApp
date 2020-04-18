import {Component, OnInit} from '@angular/core';
import {Bouquet, OrderService} from '../../../../../order.service';
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
  amountInOrder: string = this.ProductsService.GetAmountOfBouquet(this.bouquetId).toString();

  constructor(public ProductsService: OrderService,
              public activateRoute: ActivatedRoute,
              public http: HttpClient) {
    this.http.get<Bouquet>('http://localhost:8080/getBouquet?bouquetId=' + this.bouquetId.toString())
      .subscribe(result => {
        this.bouquet = result;
        console.log(this.bouquet);
      });
  }

  makeArray(finish: number) {
    const numbers = [];
    for (let i = 0; i < finish; i++){
      numbers.push(i);
    }
    return numbers;
  }

  itemChanged(value: number) {
    this.ProductsService.SetAmountInOrder(this.bouquetId, value);
  }

  ngOnInit() {
  }

  private isJustNumbers(source: string){
    const numbers = '1234567890';
    for (const i of source ) {
      let flag = false;
      for (const j of numbers) {
        if (i === j) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        return false;
      }
    }
    return true;
  }

  public ChangeAmountInOrder() {
    if (this.amountInOrder.length > 0) {
      if (this.isJustNumbers(this.amountInOrder)){
        this.ProductsService.SetAmountInOrder(this.bouquetId, Number(this.amountInOrder));
      }
    }
  }
}
