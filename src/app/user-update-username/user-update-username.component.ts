import { Component, OnInit, Input, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { User } from '../types';

const PartialUser = {
  Username: ''
}
const transferUserData = {
  FirstName: '',
  LastName: '',
  Username: '',
  Email: '',
  Password: '',
  CurrencyPref: ''
}

@Component({
  selector: 'app-user-update-username',
  templateUrl: './user-update-username.component.html',
  styleUrls: ['./user-update-username.component.scss']
})
export class UserUpdateUsernameComponent implements OnInit {
  @Input() userDetails = PartialUser;
  userData = transferUserData;

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
    console.log('username ' + this.token);
    this.userDetails = this.data;


  }

  updateUser(userId: string, token: string): void {
    this.fetchApiData.editUser(this.userData, token, userId).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('Username successfully modified', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  // updateUser(token: string, userId: string): void {
  //   this.fetchApiData.editUser(this.userData, userId, token).subscribe((resp) => {
  //     this.dialogRef.close(); //this will close modal on success
  //     console.log(resp);
  //     localStorage.setItem('userId', resp._id);
  //     this.snackBar.open('Your profile has been successfully updated!', 'OK', {
  //       duration: 2000,
  //     });
  //   }, (resp) => {
  //     console.log(resp);
  //     this.snackBar.open(resp, 'OK', {
  //       duration: 2000,
  //     });
  //   });
  //   // setTimeout(function () {
  //   //   window.location.reload();
  //   // }, 1000);
  // }

}
