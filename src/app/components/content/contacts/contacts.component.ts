import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor() { }
  partImgPath = '../../../../assets/Contacts/';
  endsOfPath: string[] = ['abUs1.jpg', 'abUs2.jpg', 'abUs3.jpg', 'abUs4.jpg', 'abUs5.jpg', 'abUs6.jpg'];
  ngOnInit() {
  }

}
