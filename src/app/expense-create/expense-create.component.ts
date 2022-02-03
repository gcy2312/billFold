import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


const PartialExpense = {
  Category: '',
  Description: '',
  Date: '',
  Amount: '',
  Currency: '',
};


@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrls: ['./expense-create.component.scss']
})
export class ExpenseCreateComponent implements OnInit {
  @Input()
  expenseInfo = PartialExpense;


  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';

  /**
   * constructor for expense create page
   * data from expense page
   * @param fetchApiData 
   * @param dialogRef 
   * @param snackBar 
   * @param data 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ExpenseCreateComponent>,
    public snackBar: MatSnackBar,

    @Inject(MAT_DIALOG_DATA) public data: any,) {
  }


  ngOnInit(): void {

  }


  /**
   * call API to create bill 
   * currency from user currencyPref
   * @param userId 
   * @param token 
   */
  createExpense(userId: string, token: string): void {
    this.expenseInfo.Currency = this.data.user.CurrencyPref;
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

}


