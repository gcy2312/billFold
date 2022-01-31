import { Component, OnInit, Input, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

const PartialUser = {
  FirstName: '',
  LastName: '',
  Username: '',
  Password: '',
  Email: '',
  CurrencyPref: ''
}

@Component({
  selector: 'app-user-update-currency',
  templateUrl: './user-update-currency.component.html',
  styleUrls: ['./user-update-currency.component.scss']
})
export class UserUpdateCurrencyComponent implements OnInit {
  @Input()
  userData = PartialUser;

  user: any = {};
  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserUpdateCurrencyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.userData = this.data;
    console.log(this.userData.CurrencyPref);
  }

  updateUser(token: string, userId: string): void {
    this.fetchApiData.editUser(this.userData, token, userId).subscribe((resp) => {
      this.dialogRef.close(); //this will close modal on success
      console.log(resp);
      localStorage.setItem('user', resp.Username);
      localStorage.setItem('userId', resp._id);
      localStorage.setItem('user', JSON.stringify(resp));
      this.snackBar.open('Your currency preference has been successfully updated!', 'OK', {
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
