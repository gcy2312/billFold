import { Component, OnInit, Input } from '@angular/core';

import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  @Input() userCred = { Username: '', Password: '' };

  hide = true;

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    // public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }
  ngOnInit(): void {
  }
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '590px',
    });
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userCred).subscribe((result) => {
      // this.dialogRef.close();
      //store user & token to local storage
      localStorage.setItem('userId', result.user._id);
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      console.log(result.token);
      console.log(result.user._id);
      console.log(result.user);

      this.snackBar.open('User successfull logged in', 'OK', {
        duration: 2000
      });
      this.router.navigate(['expenses']);
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
  // openUserLoginDialog(): void {
  //   this.dialog.open(UserLoginFormComponent, {
  //     width: '280px'
  //   });
  // }
}
