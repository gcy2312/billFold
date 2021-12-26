import { Component, OnInit, Inject } from '@angular/core';

import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { Expense } from '../types';

@Component({
  selector: 'app-expense-delete',
  templateUrl: './expense-delete.component.html',
  styleUrls: ['./expense-delete.component.scss']
})
export class ExpenseDeleteComponent implements OnInit {

  expense: Expense = {
    _id: '',
    Category: '',
    Description: '',
    Amount: { $numberDecimal: '' },
    Date: '',
    Currency: '',
    Index: true,
    UserId: ''
  }
  expenseId: string = ''

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ExpenseDeleteComponent>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data.user);
    console.log(this.data.expense);

    this.expense = this.data.expense;
    console.log(this.expense);
    this.expenseId = this.expense._id;
    console.log(this.expenseId);
  }



  deleteExpense(expenseId: string, token: string): void {

    this.fetchApiData.deleteExpense(expenseId, token).subscribe((resp: any) => {
      this.dialogRef.close();
      this.snackBar.open(
        'Expense document has been deleted!', 'OK', {
        duration: 2000,
      }
      );
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000,
      });
      this.router.navigate(['/expenses']).then(() => {
        window.location.reload();
      });
    }
    );
  }

  cancel(): void {
    this.router.navigate(['/expenses']).then(() => {
      window.location.reload();
    });
  }

}
