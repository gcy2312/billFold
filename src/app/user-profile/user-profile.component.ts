import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


import { FetchApiDataService } from '../fetch-api-data.service';

import { UserProfileDeleteComponent } from '../user-profile-delete/user-profile-delete.component';
import { UserUpdateUsernameComponent } from '../user-update-username/user-update-username.component';
import { UserUpdateNameComponent } from '../user-update-name/user-update-name.component';
import { UserUpdateEmailComponent } from '../user-update-email/user-update-email.component';
import { UserUpdatePasswordComponent } from '../user-update-password/user-update-password.component';
import { UserUpdateCurrencyComponent } from '../user-update-currency/user-update-currency.component';

import { User } from '../types';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input()
  userData: Partial<User> = {};

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';
  user = JSON.parse(localStorage.getItem('user') || '');

  /**
   * constructor for userProfile page
   * @param dialog 
   * @param snackBar 
   * @param fetchApiData
   * @param router
   */
  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public fetchApiData: FetchApiDataService,
    public router: Router,

  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user') || '');
    this.user = JSON.parse(localStorage.getItem('user') || '');
  }



  /**
   * function to open edit username dialog
   * data passed: user
   * @param user 
   */
  openUpdateUsernameDialog(user: Partial<User>) {
    const dialogRef = this.dialog.open(UserUpdateUsernameComponent, {
      data: {
        FirstName: user.FirstName,
        LastName: user.LastName,
        Username: user.Username,
        Email: user.Email,
        CurrencyPref: user.CurrencyPref,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /**
   * function to open edit name dialog
   * data passed: user
   * @param user 
   */
  openUpdateNameDialog(user: Partial<User>) {
    const dialogRef = this.dialog.open(UserUpdateNameComponent, {
      data: {
        FirstName: user.FirstName,
        LastName: user.LastName,
        Username: user.Username,
        Email: user.Email,
        CurrencyPref: user.CurrencyPref,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /**
   * function to open edit email dialog
   * data passed: user
   * @param user 
   */
  openUpdateEmailDialog(user: Partial<User>) {
    const dialogRef = this.dialog.open(UserUpdateEmailComponent, {
      data: {
        FirstName: user.FirstName,
        LastName: user.LastName,
        Username: user.Username,
        Email: user.Email,
        CurrencyPref: user.CurrencyPref,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /**
   * function to open edit password dialog
   * data passed: user
   * @param user 
   */
  openUpdatePasswordDialog(user: Partial<User>) {
    const dialogRef = this.dialog.open(UserUpdatePasswordComponent, {
      data: {
        FirstName: user.FirstName,
        LastName: user.LastName,
        Username: user.Username,
        Email: user.Email,
        CurrencyPref: user.CurrencyPref,
        Password: user.Password
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /**
   * function to open edit currency pref dialog
   * data passed: user
   * @param user 
   */
  openUpdateCurrencyDialog(user: Partial<User>) {
    const dialogRef = this.dialog.open(UserUpdateCurrencyComponent, {
      data: {
        FirstName: user.FirstName,
        LastName: user.LastName,
        Username: user.Username,
        Email: user.Email,
        CurrencyPref: user.CurrencyPref,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /**
   * function to open delete user profile dialog
   * clear local storage
   * navigate to welcome page
   */
  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(UserProfileDeleteComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.snackBar.open(result, 'OK', {
        duration: 2000,
      });
      this.router.navigate(['/welcome']).then(() => {
        window.location.reload();
      });
    });
  }

  /**
 * function to logout user 
 * clear localStorage
 */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
    this.snackBar.open('You have successfully logged out!', 'OK', {
      duration: 2000,
    });
  }

}
