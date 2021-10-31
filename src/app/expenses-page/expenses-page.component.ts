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

  getExpenses(userId: string, token: string): void {
    this.fetchApiData.getExpenses(userId, token).subscribe((resp: any) => {
      this.expenses = resp;
      this.expensesAmounts = resp.reduce(
        (accumulator: Record<string, number>,
          resp: { Amount: { $numberDecimal: string }; Date: string }) => {
          if (accumulator[resp.Date]) {
            accumulator[resp.Date] = accumulator[resp.Date] + Number(resp.Amount.$numberDecimal);
          } else {
            accumulator[resp.Date] = Number(resp.Amount.$numberDecimal)
          }
          return accumulator;
        }, {}
      );

      console.log(this.expenses);
      console.log(this.expensesAmounts);

      this.userData = {
        labels: this.chartDates,
        datasets: [{
          data: this.chartDates.map((date: number) => { return this.expensesAmounts[date] || 0 }),
          // data: this.expensesAmounts,
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
      //         unit: 'month'
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
  }

  openCreateExpenseDialog(): void {
    this.dialog.open(ExpenseCreateComponent, {
      width: '280px'
    });
  }



}


