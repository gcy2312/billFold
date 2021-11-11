import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Expense } from '../types';

const PartialExpense = {
  _id: '',
  Category: '',
  Description: '',
  Date: '',
  Amount: { $numberDecimal: '' },
  Currency: '',
};


@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.scss']
})
export class ExpenseEditComponent implements OnInit {
  @Input() expenseInfo = PartialExpense;

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ExpenseEditComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: Expense
  ) { }

  ngOnInit(): void {
    console.log('expense id: ' + this.data._id);
    console.log('userId: ' + this.userId);
    console.log('token: ' + this.token);

    console.log('amount test ' + this.data.Amount.$numberDecimal.toString().substring(0, 10));
  }

  expenseId = this.data._id;

  editExpense(userId: string, token: string, expenseId: string): void {
    // this.expenseInfo.Amount = this.data.Amount.$numberDecimal.toString().substring(0, 10);
    this.fetchApiData.editExpense(this.expenseInfo, expenseId, token, userId).subscribe((result) => {
      this.dialogRef.close();
      this.snackBar.open('Expense document successfully updated', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }



}
