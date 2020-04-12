import { Component, OnInit } from '@angular/core';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
/** Error when invalid control is dirty, touched, or submitted. */

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor() { }
  client: Client = {
    firstName: '',
    secondName: '',
    lastName: '',
    email: '',
    telephone: '',
    state: '',
    address: '',
    city: '',
    postalOffice: ''
  };
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();



  ngOnInit() {
  }

}

export interface Client {
  firstName: string;
  secondName: string;
  lastName: string;
  telephone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalOffice: string;
}
