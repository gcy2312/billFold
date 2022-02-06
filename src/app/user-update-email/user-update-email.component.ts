import { Component, OnInit, Input, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

import { User } from '../types';



@Component({
  selector: 'app-user-update-email',
  templateUrl: './user-update-email.component.html',
  styleUrls: ['./user-update-email.component.scss']
})
export class UserUpdateEmailComponent implements OnInit {
  @Input()
  userData: Partial<User> = {};

  user = JSON.parse(localStorage.getItem('user') || '');
  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';


  /**
   * constructor for updateEmail
   * data from profile page
   * @param fetchApiData 
   * @param snackBar 
   * @param dialogRef 
   * @param data 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserUpdateEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.userData.Email = this.data.Email;
  }

  /**
   * call API to update user details
   * set user in localStorage
   * reload profile page upon completion
   * @param token 
   * @param userId 
   */
  updateUser(token: string, userId: string): void {

    this.fetchApiData.editUser(this.userData, token, userId).subscribe((resp) => {
      this.dialogRef.close(); //this will close modal on success

      localStorage.setItem('userId', resp._id);
      localStorage.setItem('user', JSON.stringify(resp));

      this.snackBar.open('Your email has been successfully updated!', 'OK', {
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
