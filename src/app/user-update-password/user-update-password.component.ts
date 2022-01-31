import { Component, OnInit, Input, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

const PartialUser = {
  FirstName: '',
  LastName: '',
  Username: '',
  Password: '',
  Email: '',
  CurrencyPref: ''
}

@Component({
  selector: 'app-user-update-password',
  templateUrl: './user-update-password.component.html',
  styleUrls: ['./user-update-password.component.scss']
})
export class UserUpdatePasswordComponent implements OnInit {
  @Input()
  userData = PartialUser;
  hide = true;

  // user: any = {};
  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';
  user = JSON.parse(localStorage.getItem('user') || '');

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserUpdatePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.userData = this.data;
    console.log(this.userData.Password);
  }

  // password = new FormGroup({
  //   firstName: new FormControl()
  // });
  // newPassword: FormGroup = new FormGroup({
  //   password: new FormControl('', [Validators.required, Validators.min(3)])
  // });
  // hide = true;
  // get passwordInput() { return this.newPassword.get('password'); }

  updateUser(token: string, userId: string): void {
    this.fetchApiData.editUser(this.userData, token, userId).subscribe((resp) => {
      this.dialogRef.close(); //this will close modal on success
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp));
      localStorage.setItem('userId', resp._id);
      localStorage.setItem('user', JSON.stringify(resp));
      this.snackBar.open('Your password has been successfully updated!', 'OK', {
        duration: 2000,
      });
    }, (resp) => {
      console.log(resp);
      this.snackBar.open(resp, 'OK', {
        duration: 2000,
      });
    });
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

}
