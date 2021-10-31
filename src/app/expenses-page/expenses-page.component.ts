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
  basicOptions: any;

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
      this.expensesDates = ["2021-10-06", "2021-10-07", "2021-10-08", "20201-10-09", "2021-10-10"]
      // this.expensesDates = resp.map((resp: { Date: string; }) => resp.Date);

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


      // this.expensesAmounts = resp.map((resp: { Amount: any; }) => resp.Amount.$numberDecimal);

      console.log(this.expenses);
      console.log(this.expensesDates);
      console.log(this.expensesAmounts);

      // this.expensesDates.sort(function (a, b) {
      //   // Turn your strings into dates, and then subtract them
      //   // to get a value that is either negative, positive, or zero.
      //   return new Date(b.date) - new Date(a.date);
      // });

      this.userData = {
        // labels: this.expensesDates,
        labels: this.expensesDates,
        datasets: [{
          data: this.expensesDates.map((date: number) => { return this.expensesAmounts[date] || 0 }),
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



