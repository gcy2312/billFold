import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';
import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component';
import { UserProfileDeleteComponent } from '../user-profile-delete/user-profile-delete.component';
import { UserUpdateUsernameComponent } from '../user-update-username/user-update-username.component';
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

  ) { }

  ngOnInit(): void {
    this.getUser(this.userId, this.token);

  }

  getUser(userId: string, token: string): void {
    this.fetchApiData.getUser(userId, token).subscribe((resp: any) => {
      this.userData = resp;
      this.user = resp;
      console.log('user: ' + this.user._id);
      console.log('name' + this.user.FirstName + this.user.LastName);
    });
  }

  openUpdateDialog(user: Partial<User>) {

    const dialogRef = this.dialog.open(UserProfileUpdateComponent, {
      data: {
        FirstName: user.FirstName,
        LastName: user.LastName,
        Username: user.Username,
        Email: user.Email,
        Currency: user.CurrencyPref,
        Password: user.Password
      }
      // width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.getUser(this.userId, this.token);
  }
  openUpdateUsernameDialog(user: any) {
    const dialogRef = this.dialog.open(UserUpdateUsernameComponent, {
      data: {
        FirstName: user.FirstName,
        LastName: user.LastName,
        Username: user.Username,
        Email: user.Email,
        Currency: user.CurrencyPref,
        Password: user.Password
      }
      // width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDeleteDialog(): void {
    this.dialog.open(UserProfileDeleteComponent, {
      width: '500px'
    });
  }

}
