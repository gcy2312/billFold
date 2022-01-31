import { Component, OnInit, Input, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { User } from '../types';

const PartialUser = {
  FirstName: '',
  LastName: '',
  Username: '',
  Password: '',
  Email: '',
  CurrencyPref: ''
}
// const transferUserData = {
//   FirstName: '',
//   LastName: '',
//   Username: '',
//   Email: '',
//   Password: '',
//   CurrencyPref: ''
// }

@Component({
  selector: 'app-user-update-username',
  templateUrl: './user-update-username.component.html',
  styleUrls: ['./user-update-username.component.scss']
})
export class UserUpdateUsernameComponent implements OnInit {
  @Input()
  // userDetails = PartialUser;
  userData = PartialUser;

  user: any = {};
  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserUpdateUsernameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.userData = this.data;
    console.log(this.userData.Username);
    console.log('username ' + this.data.Username);
    // this.userDetails = this.data;


  }

  updateUser(token: string, userId: string): void {
    this.fetchApiData.editUser(this.userData, token, userId).subscribe((resp) => {
      this.dialogRef.close(); //this will close modal on success
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp));
      localStorage.setItem('userId', resp._id);
      this.snackBar.open('Your username has been successfully updated!', 'OK', {
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
