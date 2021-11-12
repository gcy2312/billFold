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
import * as moment from 'moment';

@Component({
  selector: 'app-expenses-page',
  templateUrl: './expenses-page.component.html',
  styleUrls: ['./expenses-page.component.scss']
})

export class ExpensesPageComponent implements OnInit {
  expenses: Expense[] = [];
  expense = {
    _id: '',
    Category: '',
    Description: '',
    Date: '',
    Amount: 0.0,
    Currency: '',
    UserId: '',
    Index: false
  };

  expensesDates: any = [];
  expensesAmounts: any = [];
  userData: any;
  basicOptions: any;

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';

  chartDates: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getExpenses(this.userId, this.token);
    this.getDaysArrayByMonth();
  }

  getDaysArrayByMonth() {
    var daysInMonth = moment().daysInMonth();
    var arrDays = [];

    while (daysInMonth) {
      var current = moment().date(daysInMonth).format('YYYY-MM-DD');
      arrDays.push(current);
      daysInMonth--;
    }
    this.chartDates = arrDays.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    console.log(this.chartDates);
    return this.chartDates
  }

  // getExpenses(userId: string, token: string): void {
  //   this.fetchApiData.getExpenses(userId).subscribe((resp: any) => {
  //     this.expenses = resp;
  //     console.log(this.expenses);
  //     return this.expenses;
  //   });
  // }

  getExpenses(userId: string, token: string): void {
    this.fetchApiData.getExpenses(userId, token).subscribe((resp: any) => {
      this.expenses = resp;
      console.log(this.expenses);
      this.expensesDates = this.expenses.map((e) => e.Date.toString().substr(0, 10));
      console.log('expenses dates ' + this.expensesDates);

      const newDate = resp.Date.toString().substr(0, 10);

      this.expensesAmounts = resp.reduce(
        (accumulator: Record<string, number>,
          resp: { Amount: string; newDate: string }) => {

          if (accumulator[resp.newDate]) {
            accumulator[resp.newDate] = accumulator[resp.newDate] + Number(resp.Amount);
          } else {
            accumulator[resp.newDate] = Number(resp.Amount)
          }
          return accumulator;
        }, {}
      );
      console.log('chart dates' + this.chartDates);
      console.log(this.expensesAmounts);

      this.userData = {
        labels: this.chartDates,
        datasets: [{
          data: this.chartDates.map((date: number) => { return this.expensesAmounts[date] || 0 }),
          borderColor: '#3cba9f',
          fill: false
        }]
      }
      // this.basicOptions = {
      //   plugins: {
      //     legend: {
      //       labels: {
      //         color: '#495057'
      //       }
      //     }
      //   },
      //   scales: {
      //     yAxes: [{
      //       scaleLabel: {
      //         display: true,
      //         // labelString: "ms"
      //       },
      //       ticks: {
      //         beginAtZero: true,
      //         suggestedMax: 100,
      //       }
      //     }],
      //     xAxes: [{
      //       type: 'time',
      //       time: {
      //         unit: 'day'
      //       }
      //     }],
      //   }
      // }

    });
  }

  openEditExpenseDialog(expense: Partial<Expense>): void {

    this.dialog.open(ExpenseEditComponent, {

      data: expense,
      width: '500px'
    });
    console.log('data Date: ' + expense.Date);
    console.log('data object' + expense.Amount);
  }

  openCreateExpenseDialog(): void {
    this.dialog.open(ExpenseCreateComponent, {
      width: '280px'
    });
  }



}