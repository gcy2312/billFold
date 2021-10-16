import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
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
  ) { }

  ngOnInit(): void {
  }

  updateUser(userData: Partial<User>, token: string, userId: string): void {
    this.fetchApiData.editUser(userData, userId, token).subscribe((resp) => {
      this.dialogRef.close(); //this will close modal on success
      console.log(resp);
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

}
