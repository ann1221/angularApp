import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {AccountDialogData} from '../../../classes/AccountDialogData';
import {Client} from '../../../classes/Client';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {init} from 'protractor/built/launcher';
import {DBService} from '../../../services/d-b.service';
import {HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.css']
})
export class PersonalAccountComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  localClient: Client = {
    fname: null, sname: null, lname: null,
    phone: null, email: null, address: null
  };
  dialogData: AccountDialogData = {client: this.localClient, isSigningUp: false};

  ngOnInit(): void {
  }

  signInDialogOpen(){
    this.dialogData.isSigningUp = false;
    this.openDialog(500);
  }

  signUpDialogOpen(){
    this.dialogData.isSigningUp = true;
    this.openDialog(500);
  }

  openDialog( dialogWidth: number){
    const dialogRef = this.dialog.open(PersonalAccountDialogComponent, {
      width: dialogWidth.toString() + 'px',
      data: this.dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(this.dialogData);
    });
  }
}

@Component({
  selector: 'app-personal-account-dialog',
  templateUrl: './personal-account-dialog.html',
})


export class PersonalAccountDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PersonalAccountComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: AccountDialogData,
    public dbService: DBService)
  {
    this.initForm();
  }

  clientReactiveForm: FormGroup;

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
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: ['',
        [
          Validators.required
        ]
      ]
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    const controls = this.clientReactiveForm.controls;
    if (this.data.isSigningUp){
      const heads = new HttpHeaders({'content-type': 'application/json'});
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
    } else {
      const heads = new HttpHeaders({ Authorization: 'Basic ' + btoa(controls.email.value + ':' + controls.password.value)});
      heads.append('content-type', 'application/json');
      this.dbService.signIn(heads).subscribe(result => {
        console.log(result);
      },
        error => {
        console.log('error was occured');
        console.log(btoa(controls.email.value + ':' + controls.password.value));
        });
    }

    this.dialogRef.close();
  }

}
