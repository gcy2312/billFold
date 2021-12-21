import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { User } from '../types';
import * as moment from 'moment';
import { DefaultValueAccessor } from '@angular/forms';


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
  @Input()
  expenseInfo = PartialExpense;


  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';


  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ExpenseCreateComponent>,
    public snackBar: MatSnackBar,

    @Inject(MAT_DIALOG_DATA) public data: any,) {
  }


  ngOnInit(): void {
    console.log(this.data.date);
    console.log(this.data.user.CurrencyPref);
  }



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


