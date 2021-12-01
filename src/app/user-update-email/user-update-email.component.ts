import { Component, OnInit, Input, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

const PartialUser = {
  Email: ''
}

@Component({
  selector: 'app-user-update-email',
  templateUrl: './user-update-email.component.html',
  styleUrls: ['./user-update-email.component.scss']
})
export class UserUpdateEmailComponent implements OnInit {
  @Input()
  userData = PartialUser;

  user: any = {};
  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserUpdateEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  updateUser(token: string, userId: string): void {
    this.fetchApiData.editUser(this.userData, token, userId).subscribe((resp) => {
      this.dialogRef.close(); //this will close modal on success
      console.log(resp);
      localStorage.setItem('user', resp.Username);
      localStorage.setItem('userId', resp._id);
      this.snackBar.open('Your email has been successfully updated!', 'OK', {
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
