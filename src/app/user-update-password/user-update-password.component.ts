import { Component, OnInit, Input, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

const PartialUser = {
  Password: ''
}

@Component({
  selector: 'app-user-update-password',
  templateUrl: './user-update-password.component.html',
  styleUrls: ['./user-update-password.component.scss']
})
export class UserUpdatePasswordComponent implements OnInit {
  @Input()
  userData = PartialUser;

  user: any = {};
  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserUpdatePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  newPassword: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.min(3)])
  });
  hide = true;
  get passwordInput() { return this.newPassword.get('password'); }

  updateUser(token: string, userId: string): void {
    this.fetchApiData.editUser(this.userData, token, userId).subscribe((resp) => {
      this.dialogRef.close(); //this will close modal on success
      console.log(resp);
      localStorage.setItem('user', resp.Username);
      localStorage.setItem('userId', resp._id);
      this.snackBar.open('Your password has been successfully updated!', 'OK', {
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
