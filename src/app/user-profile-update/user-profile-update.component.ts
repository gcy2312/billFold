import { Component, OnInit, Input, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

import { User } from '../types';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.scss']
})
export class UserProfileUpdateComponent implements OnInit {
  @Input() userData = { FirstName: '', LastName: '', Username: '', Password: '', Email: '', CurrencyPref: '' };

  user: any = {};
  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserProfileUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log('first name ' + this.userData.FirstName);

  }


  updateUser(token: string, userId: string): void {
    this.fetchApiData.editUser(this.userData, token, userId).subscribe((resp) => {
      this.dialogRef.close(); //this will close modal on success
      console.log(resp);
      localStorage.setItem('user', resp.Username);
      localStorage.setItem('userId', resp._id);
      this.snackBar.open('Your profile has been successfully updated!', 'OK', {
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
  // updateUser(userData: Partial<User>, token: string, userId: string): void {
  //   this.fetchApiData.editUser(userData, userId, token).subscribe((resp) => {
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
  //   setTimeout(function () {
  //     window.location.reload();
  //   }, 1000);
  // }

}
