import { Component, OnInit } from '@angular/core';
import {DBService} from '../../services/d-b.service';
import {CookieServiceService} from '../../services/cookie-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public cookieService: CookieServiceService) { }

  ngOnInit(): void {
  }

  getCountOfBouquet(){
    return this.cookieService.getBouqutCountInOrder();
  }

}
