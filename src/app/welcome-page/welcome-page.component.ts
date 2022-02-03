import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

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

  /**
   * constructor for welcome page
   * @param dialog 
   * @param fetchApiData 
   * @param snackBar 
   * @param router 
   */
  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * function to open user registration dialog
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '590px',
    });
  }

  /**
   * call API to login user
   * set user to localStorage
   * navigate to expensePage upon completion
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userCred).subscribe((result) => {
      localStorage.setItem('userId', result.user._id);
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);

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
}
