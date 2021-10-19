import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FetchApiDataService } from '../fetch-api-data.service';
import { ExpenseDetailsComponent } from '../expense-details/expense-details.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseEditComponent } from '../expense-edit/expense-edit.component';
import { ExpenseCreateComponent } from '../expense-create/expense-create.component';

import { Expense } from '../types';


@Component({
  selector: 'app-expenses-page',
  templateUrl: './expenses-page.component.html',
  styleUrls: ['./expenses-page.component.scss']
})

export class ExpensesPageComponent implements OnInit {
  expenses: Expense[] = [];
  expense: Expense = {
    _id: '',
    Category: '',
    Description: '',
    Date: '',
    Amount: {
      $numberDecimal: ''
    },
    Currency: '',
    UserId: '',
    Index: false
  };
  userExpensesData: any;
  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getExpenses(this.userId, this.token);

    this.userExpensesData = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets:
        // this.getExpenses(this.userId, this.token),
        [
          {
            label: 'First Dataset',
            data: this.expense.Amount.$numberDecimal,
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
          },
        ]
    }
  }

  getExpenses(userId: string, token: string): void {
    this.fetchApiData.getExpenses(userId, token).subscribe((resp: any) => {
      this.expenses = resp;
      console.log(this.expenses);
    });
  }

  openEditExpenseDialog(expense: Partial<Expense>): void {
    this.dialog.open(ExpenseEditComponent, {
      data: expense,
      width: '500px'
    });
  }

  openCreateExpenseDialog(): void {
    this.dialog.open(ExpenseCreateComponent, {
      width: '280px'
    });
  }

}
