import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DBService} from '../../../../services/d-b.service';
import {Client} from '../../../../classes/Client';
import {CookieServiceService} from '../../../../services/cookie-service.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private dbService: DBService,
              private cookieService: CookieServiceService) { }

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
      this.dbService.openSnackBar('Пожалуйта, заполните все обязательные поля корректно', 'Ок', 3000);
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

    this.dbService.addClietnOrder(heads, body, parametrs).subscribe( result => {
        console.log('received');
        this.dbService.openSnackBar('Ваш заказ был принят, менеджер свяжется с Вами в ближайшее время',
          'Ок', 10000);
        this.cookieService.cleanOrder();
    }, error => {
        this.dbService.openSnackBar('Возникла ошибка сервера, возможно, часть товара была раскуплена',
          'Ок', 10000);
        this.dbService.SetCatalog();
        console.log('not received');
    });
  }

  GetOrder(){
    const map: { [key: string]: string} = {};
    for (const orderUnit of this.cookieService.buildOrder()) {
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


