import {Component, OnInit, Output} from '@angular/core';
import {Bouquet, OrderService} from '../../../order.service';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor(public orderService: OrderService) {
    // this.http.get<Bouquet[]>('http://localhost:8080/main/getCatalog').subscribe(result => {
    //   this.CATALOG = result;
    // });
  }

  ngOnInit() {  }
}

