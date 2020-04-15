import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public ProductsService: OrderService) { }

  ngOnInit(): void {
  }

}
