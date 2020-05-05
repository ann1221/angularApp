import {AfterContentInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {AccountDialogData} from '../../../classes/AccountDialogData';
import {Client} from '../../../classes/Client';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {init} from 'protractor/built/launcher';
import {DBService} from '../../../services/d-b.service';
import {HttpHeaders} from '@angular/common/http';
import {CookieServiceService} from '../../../services/cookie-service.service';


@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.css']
})
export class PersonalAccountComponent implements OnInit, AfterContentInit {
  localClient: Client = {
    fname: null, sname: null, lname: null,
    phone: null, email: null, address: null
  };

  dialogData: AccountDialogData = {
    client: this.localClient,
    isSigningUp: false,
    isGetClient: true};

  constructor(public dialog: MatDialog,
              public  dbService: DBService,
              public cookieService: CookieServiceService) { }

  path = '../../../../assets/PersonalAccount/';

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    const btoaVal = this.cookieService.getCid();
    if (btoaVal == null) {
      this.dialogData.isGetClient = false;
      return;
    }
    const heads = new HttpHeaders({ Authorization: 'Basic ' + btoaVal});
    this.dbService.signIn(heads).subscribe(result => {
      console.log(result);
      this.dialogData.client = (result as Client);
      this.dialogData.isGetClient = true;
    }, error => {
      console.log('error was occured in sign in');
      this.dialogData.isGetClient = false;
    });
  }

  signInDialogOpen(){
    this.dialogData.isSigningUp = false;
    this.openDialog(500);
  }

  signUpDialogOpen(){
    this.dialogData.isSigningUp = true;
    this.openDialog(500);
  }

  signOut() {
    const btoaVal = this.cookieService.getCid();
    const heads = new HttpHeaders({ Authorization: 'Basic ' + btoaVal});
    this.cookieService.deleteCid();
    this.dbService.signOut(heads);
    this.dialogData.isGetClient = false;
  }

  openDialog( dialogWidth: number){
    const dialogRef = this.dialog.open(PersonalAccountDialogComponent, {
      width: dialogWidth.toString() + 'px',
      data: this.dialogData,
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('THIS IS I->' + this.dialogData.client.fname);
    });
  }

  isExistEmptyFields(): boolean{
    return (this.localClient.fname === 'null' || this.localClient.sname === 'null' || this.localClient.lname === 'null'
      || this.localClient.phone == null || this.localClient.address === 'null' || this.localClient.email === 'null');
  }
}

@Component({
  selector: 'app-personal-account-dialog',
  templateUrl: './personal-account-dialog.html'
})

export class PersonalAccountDialogComponent {
  signInForm: FormGroup;
  signUpForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PersonalAccountComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: AccountDialogData,
    public dbService: DBService,
    public cookieService: CookieServiceService)
  {
    this.initSignInForm();
    this.initSignUpForm();
  }

  initSignUpForm(){
    const justLetterPattern = '[a-zA-ZА-Яа-я]*';
    const withoutRussianLettersPattern = '[^а-яА-Я]*';

    this.signUpForm = this.fb.group({
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
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: ['',
        [
          Validators.pattern(withoutRussianLettersPattern),
          Validators.required
        ]
      ]
    });
  }

  initSignInForm() {
    const withoutRussianLettersPattern = '[^а-яА-Я]*';

    this.signInForm = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: ['',
        [
          Validators.pattern(withoutRussianLettersPattern),
          Validators.required
        ]
      ]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    if (this.data.isSigningUp){
      const controls = this.signUpForm.controls;
      this.signUp(controls);
    } else {
      const controls = this.signInForm.controls;
      this.signIn(controls);
    }
  }

  signUp(controls) {
    if (!this.validate(this.signUpForm, controls)) { return; }

    const heads = new HttpHeaders({'content-type': 'application/json'});
    heads.append('content-type', 'application/json');
    const client: Client = {
      fname: controls.fname.value, sname: controls.sname.value,
      email: controls.email.value, password: controls.password.value,
      address: null, phone: null, lname: null
    };
    this.dbService.signUp(heads, JSON.stringify(client)).subscribe(result => {
        console.log('OK');

      },
      error => {
        console.log(client);
      });
    this.dialogRef.close();
  }

  signIn(controls) {
    console.log(controls.password.value);
    if (!this.validate(this.signInForm, controls)) { return; }

    const btoaVal =  btoa(controls.email.value + ':' + controls.password.value);
    const heads = new HttpHeaders({ Authorization: 'Basic ' + btoaVal});
    heads.append('content-type', 'application/json');
    this.dbService.signIn(heads).subscribe(result => {
        console.log(result);
        this.data.client = (result as Client);
        this.data.isGetClient = true;
        this.cookieService.setCid(btoaVal);
        this.dialogRef.close();
      }, error => {
        console.log('error was occured in sign in');
        this.dbService.openSnackBar('Вы ввели неправильный email или пароль', 'ОК', 3000);
    });
  }

  validate(form: FormGroup, controls): boolean{
    if (form.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      this.dbService.openSnackBar('Пожалуйта, заполните все обязательные поля корректно', 'Ок', 3000);
      return false;
    }
    return true;
  }

}
