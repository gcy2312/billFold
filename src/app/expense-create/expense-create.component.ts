import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../types';


const PartialExpense = {
  Category: '',
  Description: '',
  Date: '',
  Amount: { $numberDecimal: '' },
  Currency: '',
};


@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrls: ['./expense-create.component.scss']
})
export class ExpenseCreateComponent implements OnInit {
  @Input() expenseInfo = PartialExpense;
  // userData = { FirstName: '', LastName: '', Email: '', Username: '', Password: '', CurrencyPref: '' };

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';
  // userCurrency: any = '';
  // user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ExpenseCreateComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
  }


  ngOnInit(): void {
    // this.getUser(this.userId, this.token);
    // console.log('data  ' + this.data.CurrencyPref);
  }

  createExpense(userId: string, token: string): void {
    this.expenseInfo.Currency = this.data.CurrencyPref;
    this.fetchApiData.createExpense(this.expenseInfo, userId, token).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('Expense document successfully added', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  // getUser(userId: string, token: string): void {
  //   this.fetchApiData.getUser(userId, token).subscribe((resp: any) => {
  //     // this.userData = resp;
  //     this.user = resp;
  //     this.userCurrency = this.user.CurrencyPref;
  //     console.log('user: ' + this.userCurrency);
  //     console.log('name' + this.user.FirstName + this.user.LastName);
  //   });
  // }

}
