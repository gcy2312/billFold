import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '../types';

@Component({
  selector: 'app-user-profile-delete',
  templateUrl: './user-profile-delete.component.html',
  styleUrls: ['./user-profile-delete.component.scss']
})
export class UserProfileDeleteComponent implements OnInit {

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';
  User: User = { _id: '', FirstName: '', LastName: '', Username: '', Password: '', Email: '', CurrencyPref: '' };

  /**
   * constructor for profile delete
   * @param fetchApiData 
   * @param snackBar 
   * @param router 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * call API to delete user account
   * clear local storage
   * reroute to /welcome
   * @param token 
   * @param userId 
   */
  deleteUserAccount(token: string, userId: string): void {
    this.fetchApiData.deleteUser(token, userId).subscribe((resp: any) => {
      this.snackBar.open(
        'Your account has been deleted!', 'OK', {
        duration: 2000,
      }
      );
      localStorage.clear();
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000,
      });
      this.router.navigate(['/welcome']).then(() => {
        window.location.reload();
      });
    }
    );
  }

  /**
   * function to cancel and navigate back to profile page
   */
  cancel(): void {
    this.router.navigate(['/profile']).then(() => {
      window.location.reload();
    });
  }


}
