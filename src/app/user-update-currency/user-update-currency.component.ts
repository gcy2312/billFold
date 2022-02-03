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

  /**
   * constructor for editCurrency page
   * data from profile page
   * @param fetchApiData 
   * @param snackBar 
   * @param dialogRef 
   * @param data 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserUpdateCurrencyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.userData = this.data;
  }

  /**
   * call API to edit user data
   * set new user in localStorage
   * relaod profile page on complete
   * @param token 
   * @param userId 
   */
  updateUser(token: string, userId: string): void {
    this.fetchApiData.editUser(this.userData, token, userId).subscribe((resp) => {
      this.dialogRef.close(); //this will close modal on success
      localStorage.setItem('user', resp.Username);
      localStorage.setItem('userId', resp._id);
      localStorage.setItem('user', JSON.stringify(resp));
      this.snackBar.open('Your currency preference has been successfully updated!', 'OK', {
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
