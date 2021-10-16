import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile-delete',
  templateUrl: './user-profile-delete.component.html',
  styleUrls: ['./user-profile-delete.component.scss']
})
export class UserProfileDeleteComponent implements OnInit {

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  deleteUserAccount(token: string, userId: string): void {
    this.fetchApiData.deleteUser(userId, token).subscribe((resp: any) => {
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

  cancel(): void {
    this.router.navigate(['/profile']).then(() => {
      window.location.reload();
    });
  }


}
