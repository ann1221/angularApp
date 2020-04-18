import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {OrderService} from '../../order.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  emailReactiveForm: FormGroup;
  constructor(private fb: FormBuilder, private orderService: OrderService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.emailReactiveForm = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ]});
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.emailReactiveForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }

  onSubmit() {
    const controls = this.emailReactiveForm.controls;
    if (this.emailReactiveForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      this.orderService.openSnackBar('Пожалуйта, введите почту корректно', 'Ок');
      return;
    }
    console.log(this.emailReactiveForm.value);
  }


}
