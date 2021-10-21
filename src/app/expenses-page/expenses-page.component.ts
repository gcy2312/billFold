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
  // data: any;

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';
  // dataSet = [];
  // labels = [];
  // chart: any;


  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getExpenses(this.userId, this.token);

    this.userData = {
      labels: this.expensesDates,
      datasets: [{
        data: this.expensesAmounts,
        borderColor: '#3cba9f',
        fill: false
      }]
    }

    // this.fetchApiData.getExpenses('Date', 'Amount')
    //   .subscribe(data => {
    //     this.data.datasets[0].data = data.map(a => a.Amount.$numberDecimal);
    //     this.data.labels = data.map(a => a.Date);
    //     this.chart.refresh();

    // });

  }

  getExpenses(userId: string, token: string): void {
    this.fetchApiData.getExpenses(userId, token).subscribe((resp: any) => {
      this.expenses = resp;
      this.expensesDates = resp.map((resp: { Date: string; }) => resp.Date);
      this.expensesAmounts = resp.map((resp: { Amount: any; }) => resp.Amount.$numberDecimal);


      // this.data.datasets[0].data = this.data.map((e: any) => e.Amount.$numberDecimal);
      // this.data.labels = this.data.map((e: any) => e.Date);
      // this.chart.refresh();


      console.log(this.expenses);
      console.log(this.expensesDates);
      console.log(this.expensesAmounts);
      return this.expensesAmounts;
      return this.expensesDates;
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


// function a(a: any, arg1: (any: any) => any): any {
//   throw new Error('Function not implemented.');
// }

// function e(e: any): any {
//   throw new Error('Function not implemented.');
// }

