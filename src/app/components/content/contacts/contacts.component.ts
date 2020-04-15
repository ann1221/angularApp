import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  commentReactiveForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  partImgPath = '../../../../assets/Contacts/';
  endsOfPath: string[] = ['abUs1.jpg', 'abUs2.jpg', 'abUs3.jpg', 'abUs4.jpg', 'abUs5.jpg', 'abUs6.jpg'];

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.commentReactiveForm = this.fb.group({
      name: ['',
        [
          Validators.required,
        ]
      ],
      comment: ['',
        [
          Validators.required,
        ]
      ]
    });
  }

  onSubmit() {
    const controls = this.commentReactiveForm.controls;
    console.log(this.commentReactiveForm.value);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.commentReactiveForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }

}
