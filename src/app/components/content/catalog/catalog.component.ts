import {AfterContentInit, AfterViewInit, Component, OnInit, Output} from '@angular/core';
import {DBService} from '../../../services/d-b.service';
import {Bouquet} from '../../../classes/Bouquet';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit{

  constructor(public dbService: DBService) {
  }

  titles: string[] = ['ВСЕ', 'ТЮЛЬПАН', 'РОЗА', 'ХРИЗАНТЕМА', 'АЛЬСТРОМЕРИЯ'];
  curTitle = this.titles[0];

  page = 0;
  capacity = 12;
  localCatalog: Bouquet[] = [];

  ngOnInit() { this.initLocalCatalog(); }

  initLocalCatalog(){
    if (this.curTitle === this.titles[0]){
      this.dbService.getCatalogSlice(this.page, this.capacity).subscribe(result => {
        console.log(result);
        this.localCatalog = result;
      }, error => {
        console.log('server error was occured');
      });
      return;
    }

    this.dbService.getCatalogByProdNameSlice(this.curTitle, this.page, this.capacity).subscribe(result => {
      console.log(result);
      this.localCatalog = result;
    }, error => {
      console.log('server error was occured');
    });
  }
}

