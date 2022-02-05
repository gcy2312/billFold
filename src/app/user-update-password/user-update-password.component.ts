import { Component, OnInit, Input, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { User } from '../types';


@Component({
  selector: 'app-user-update-password',
  templateUrl: './user-update-password.component.html',
  styleUrls: ['./user-update-password.component.scss']
})
export class UserUpdatePasswordComponent implements OnInit {
  @Input()
  userData: Partial<User> = {};
  hide = true;

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';
  user = JSON.parse(localStorage.getItem('user') || '');
  code = localStorage.getItem('code') || '';

  /**
   * constructor for updatePassword
   * data from profile page
   * @param fetchApiData 
   * @param snackBar 
   * @param dialogRef 
   * @param data 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserUpdatePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.userData.Password = this.code;
  }

  /**
   * call API to update user password
   * set user to localStoage
   * reload page upon completion
   * @param token 
   * @param userId 
   */
  updateUser(token: string, userId: string): void {
    this.fetchApiData.editUser(this.userData, token, userId).subscribe((resp) => {
      this.dialogRef.close(); //this will close modal on success

      localStorage.setItem('userId', resp._id);
      localStorage.setItem('user', JSON.stringify(resp));
      this.snackBar.open('Your password has been successfully updated!', 'OK', {
        duration: 2000,
      });
    }, (resp) => {

      this.snackBar.open(resp, 'OK', {
        duration: 2000,
      });
    });
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

}
