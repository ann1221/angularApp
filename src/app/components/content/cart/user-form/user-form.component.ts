import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

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
    console.log(this.clientReactiveForm.value);
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
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}
