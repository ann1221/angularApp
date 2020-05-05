import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DBService} from '../../../services/d-b.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  commentReactiveForm: FormGroup;
  constructor(private fb: FormBuilder, private orderService: DBService) { }

  partImgPath = '../../../../assets/Contacts/';
  endsOfPath: string[] = ['abUs1_2_3.jpg', 'abUs2.jpg', 'abUs3.jpg', 'abUs4.jpg', 'abUs5.jpg', 'abUs6.jpg'];

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.commentReactiveForm = this.fb.group({
      fname: ['',
        [
          Validators.required,
        ]
      ],
      sname: ['',
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
    if (this.commentReactiveForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      this.orderService.openSnackBar('Пожалуйта, введите обязательные поля корректно',
        'Ок', 3000);
      return;
    }
    console.log(this.commentReactiveForm.value);
    this.orderService.Comment(this.commentReactiveForm.value.fname, this.commentReactiveForm.value.sname, this.commentReactiveForm.value['comment']).subscribe(result => {
      console.log(result);
    });

    this.orderService.openSnackBar('Мы сохранили Ваш комментарий, благодарим Вас за проявленное внимание!',
      'Ок', 3000);
    this.initForm();
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.commentReactiveForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }
}
