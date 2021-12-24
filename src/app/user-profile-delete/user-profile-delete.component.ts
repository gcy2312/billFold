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
  // User = localStorage.getItem('user') || {};
  User: User = { _id: '', FirstName: '', LastName: '', Username: '', Password: '', Email: '', CurrencyPref: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    console.log(this.userId);
    console.log(this.token);
  }

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
      // this.router.navigate(['/welcome']).then(() => {
      //   window.location.reload();
      // });
    }
    );
  }

  cancel(): void {
    this.router.navigate(['/profile']).then(() => {
      window.location.reload();
    });
  }


}
