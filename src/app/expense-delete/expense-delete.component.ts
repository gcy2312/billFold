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

  /**
   * constructor for expenseDelete 
   * data from expensePage
   * @param fetchApiData 
   * @param snackBar 
   * @param dialog 
   * @param dialogRef 
   * @param router 
   * @param data 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ExpenseDeleteComponent>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.expense = this.data.expense;
    this.expenseId = this.expense._id;
  }


  /**
   * call API to delete expense entry
   * @param expenseId 
   * @param token 
   */
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

  /**
   * function cancel to navigate back to expenses page
   */
  cancel(): void {
    this.router.navigate(['/expenses']).then(() => {
      window.location.reload();
    });
  }

}
