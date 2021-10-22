import { Component, OnInit } from '@angular/core';

import { DatePipe } from '@angular/common';
import { FetchApiDataService } from '../fetch-api-data.service';
import { ExpenseDetailsComponent } from '../expense-details/expense-details.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Chart } from 'chart.js';


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

  expensesDates: any = [];
  expensesAmounts: any = [];
  userData: any;

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
  }



  getExpenses(userId: string, token: string): void {
    this.fetchApiData.getExpenses(userId, token).subscribe((resp: any) => {
      this.expenses = resp;
      this.expensesDates = resp.map((resp: { Date: string; }) => resp.Date);
      this.expensesAmounts = resp.map((resp: { Amount: any; }) => resp.Amount.$numberDecimal);

      console.log(this.expenses);
      console.log(this.expensesDates);
      console.log(this.expensesAmounts);

      // this.expensesDates.sort(function (a, b) {
      //   // Turn your strings into dates, and then subtract them
      //   // to get a value that is either negative, positive, or zero.
      //   return new Date(b.date) - new Date(a.date);
      // });

      this.userData = {
        labels: this.expensesDates,
        datasets: [{
          data: this.expensesAmounts,
          borderColor: '#3cba9f',
          fill: false
        }]
      }
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



