import {Component, OnInit, Output} from '@angular/core';
import {Bouquet, ProductsServiceService} from '../../../products-service.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor(public http: HttpClient, public ProductsService: ProductsServiceService) {
    this.http.get<Bouquet[]>('http://localhost:8080/main/getCatalog').subscribe(result => {
      this.ProductsService.SetCatalog(result);
      console.log(result);
    });
  }

  ngOnInit() {  }
}

