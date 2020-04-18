import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OrderService} from '../../../../order.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient, private orderService: OrderService) { }

  clientReactiveForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    const justLetterPattern = '[a-zA-ZА-Яа-я]*';
    const justNumbersPattern = '[0-9]*';
    this.clientReactiveForm = this.fb.group({
      fname: ['',
        [
          Validators.required,
          Validators.pattern(justLetterPattern)
        ]
      ],
      sname: ['',
        [
          Validators.required,
          Validators.pattern(justLetterPattern)
        ]
      ],
      lname: ['',
        [
          Validators.pattern(justLetterPattern)
        ]
      ],
      phone: ['',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
          Validators.pattern(justNumbersPattern)
        ]
      ],
      address: ['',
        [
          Validators.required
        ]
      ],
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      state: ['',
        [
          Validators.required
        ]
      ],
      city: ['',
        [
        ]
      ],
      postalCode: ['',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(justNumbersPattern)
        ]
      ],
    });
  }
  onSubmit() {
    const controls = this.clientReactiveForm.controls;
    if (this.clientReactiveForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      this.orderService.openSnackBar('Пожалуйта, заполните все обязательные поля корректно', 'Ок');
      return;
    }

    console.log(this.clientReactiveForm.value);

    const client: Client = {
      fname: controls.fname.value,
      sname: controls.sname.value,
      lname: controls.lname.value,
      phone_number: controls.phone.value,
      address: controls.state.value.trim() + ';' + controls.city.value.trim() +
        ';' + controls.postalCode.value.trim() + ';' + controls.address.value.trim(),
      email: controls.email.value.trim()
    };

    const heads = { 'content-type': 'application/json'};
    const body = JSON.stringify(client);
    const parametrs = new HttpParams().set('bouquetList', JSON.stringify(this.GetOrder()));

    this.http.post('http://localhost:8080/addClientOrder', body,
      {headers: heads, params: parametrs}).subscribe( result => {
        console.log('received');
    }, error => {
        console.log('not received');
    });
  }

  GetOrder(){
    const map: { [key: string]: string} = {};
    for (const orderUnit of this.orderService.getOrder()) {
      map[orderUnit.bouquet_id.toString()] = orderUnit.amount.toString();
    }
    return map;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.clientReactiveForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }
}

export interface Client {
  fname: string;
  sname: string;
  lname: string;
  phone_number: string;
  email: string;
  address: string;
}
