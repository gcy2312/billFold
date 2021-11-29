import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';
import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component';
import { UserProfileDeleteComponent } from '../user-profile-delete/user-profile-delete.component';
import { User } from '../types';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { FirstName: '', LastName: '', Email: '', Username: '', Password: '', CurrencyPref: '' };

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';
  user: any = {};

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileComponent>
  ) { }

  ngOnInit(): void {
    this.getUser(this.userId, this.token);
  }

  getUser(userId: string, token: string): void {
    this.fetchApiData.getUser(userId, token).subscribe((resp: any) => {
      this.userData = resp;
      this.user = resp;
      console.log('user: ' + this.user);
    });
  }

  openUpdateDialog(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      width: '500px'
    });
  }

  openDeleteDialog(): void {
    this.dialog.open(UserProfileDeleteComponent, {
      width: '500px'
    });
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
  //   this.getUser(this.userId, this.token);
  // }

}
