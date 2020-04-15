import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  emailReactiveForm: FormGroup;
  constructor(private fb: FormBuilder) {}

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
    console.log(this.emailReactiveForm.value);
  }


}
