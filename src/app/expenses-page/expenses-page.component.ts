import { Component, OnInit } from '@angular/core';

import { DatePipe } from '@angular/common';
import { FetchApiDataService } from '../fetch-api-data.service';
import { ExpenseDetailsComponent } from '../expense-details/expense-details.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Chart } from 'chart.js';


import { ExpenseEditComponent } from '../expense-edit/expense-edit.component';
import { ExpenseCreateComponent } from '../expense-create/expense-create.component';

import { Expense, User } from '../types';
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
    Amount: { $numberDecimal: '' },
    Currency: '',
    UserId: '',
    Index: false
  };

  // expensesDates: any = [];
  // expensesAmounts: any = [];

  todayDate: string = '';

  cmExpenses: any = [];
  formattedDates: any = [];
  currentMonth: string = '';
  userData: any = {};
  basicOptions: any;

  foodAmounts: any = [];
  housingExpenses: any = [];
  billsAmounts: any = [];
  savingsAmounts: any = [];
  entertainmentAmounts: any = [];
  personalAmounts: any = [];
  micelAmounts: any = [];
  medicalAmounts: any = [];
  restaurantAmounts: any = [];
  transportAmounts: any = [];

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';
  user: any = {};

  chartDates: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getUser(this.userId, this.token);
    this.getExpenses(this.userId, this.token);
    this.getDaysArrayByMonth();
    this.todayDate = moment().format('YYYY-MM-DD');
  }

  getDaysArrayByMonth() {
    var now = moment();
    this.currentMonth = now.format('MMMM');
    console.log(this.currentMonth);
    var daysInMonth = moment().daysInMonth();
    var arrDays = [];

    while (daysInMonth) {
      var current = moment().date(daysInMonth).format('YYYY-MM-DD');
      arrDays.push(current);
      daysInMonth--;
    }
    this.chartDates = arrDays.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    console.log(this.chartDates);

    this.formattedDates = this.chartDates.map((x: any) => {
      const y = moment(x).format('ll').slice(0, 6).replace(',', '');
      return y
    });
    return this.chartDates
  }

  getExpenses(userId: string, token: string): void {
    this.fetchApiData.getExpenses(userId, token).subscribe((resp: any) => {
      this.expenses = resp;

      this.cmExpenses = this.expenses.filter((expense) => this.chartDates.includes(expense.Date));
      console.log(this.cmExpenses);

      const housExp = resp.filter((x: { Category: string; }) => x.Category === 'Housing');
      const transExp = resp.filter((x: { Category: string; }) => x.Category === 'Transportation');
      const billExp = resp.filter((x: { Category: string; }) => x.Category === 'Bills');
      const foodExp = resp.filter((x: { Category: string; }) => x.Category === 'Food');
      const medExp = resp.filter((x: { Category: string; }) => x.Category === 'Medical');
      const savExp = resp.filter((x: { Category: string; }) => x.Category === 'Savings');
      const entExp = resp.filter((x: { Category: string; }) => x.Category === 'Entertainment');
      const persExp = resp.filter((x: { Category: string; }) => x.Category === 'Personal');
      const micExp = resp.filter((x: { Category: string; }) => x.Category === 'Micellaneous');

      this.foodAmounts = foodExp.reduce(
        (accumulator: Record<string, number>,
          resp: { Amount: string; Date: string }) => {
          if (accumulator[resp.Date]) {
            accumulator[resp.Date] = accumulator[resp.Date] + Number(resp.Amount);
          } else {
            accumulator[resp.Date] = Number(resp.Amount)
          }
          return accumulator;
        }, {}
      );
      this.housingExpenses = housExp.reduce(
        (accumulator: Record<string, number>,
          resp: { Amount: string; Date: string }) => {
          if (accumulator[resp.Date]) {
            accumulator[resp.Date] = accumulator[resp.Date] + Number(resp.Amount);
          } else {
            accumulator[resp.Date] = Number(resp.Amount)
          }
          return accumulator;
        }, {}
      );
      this.billsAmounts = billExp.reduce(
        (accumulator: Record<string, number>,
          resp: { Amount: string; Date: string }) => {
          if (accumulator[resp.Date]) {
            accumulator[resp.Date] = accumulator[resp.Date] + Number(resp.Amount);
          } else {
            accumulator[resp.Date] = Number(resp.Amount)
          }
          return accumulator;
        }, {}
      );
      this.savingsAmounts = savExp.reduce(
        (accumulator: Record<string, number>,
          resp: { Amount: string; Date: string }) => {
          if (accumulator[resp.Date]) {
            accumulator[resp.Date] = accumulator[resp.Date] + Number(resp.Amount);
          } else {
            accumulator[resp.Date] = Number(resp.Amount)
          }
          return accumulator;
        }, {}
      );
      this.entertainmentAmounts = entExp.reduce(
        (accumulator: Record<string, number>,
          resp: { Amount: string; Date: string }) => {
          if (accumulator[resp.Date]) {
            accumulator[resp.Date] = accumulator[resp.Date] + Number(resp.Amount);
          } else {
            accumulator[resp.Date] = Number(resp.Amount)
          }
          return accumulator;
        }, {}
      );
      this.personalAmounts = persExp.reduce(
        (accumulator: Record<string, number>,
          resp: { Amount: string; Date: string }) => {
          if (accumulator[resp.Date]) {
            accumulator[resp.Date] = accumulator[resp.Date] + Number(resp.Amount);
          } else {
            accumulator[resp.Date] = Number(resp.Amount)
          }
          return accumulator;
        }, {}
      );
      this.micelAmounts = micExp.reduce(
        (accumulator: Record<string, number>,
          resp: { Amount: string; Date: string }) => {
          if (accumulator[resp.Date]) {
            accumulator[resp.Date] = accumulator[resp.Date] + Number(resp.Amount);
          } else {
            accumulator[resp.Date] = Number(resp.Amount)
          }
          return accumulator;
        }, {}
      );
      this.medicalAmounts = medExp.reduce(
        (accumulator: Record<string, number>,
          resp: { Amount: string; Date: string }) => {
          if (accumulator[resp.Date]) {
            accumulator[resp.Date] = accumulator[resp.Date] + Number(resp.Amount);
          } else {
            accumulator[resp.Date] = Number(resp.Amount)
          }
          return accumulator;
        }, {}
      );

      this.transportAmounts = transExp.reduce(
        (accumulator: Record<string, number>,
          resp: { Amount: string; Date: string }) => {
          if (accumulator[resp.Date]) {
            accumulator[resp.Date] = accumulator[resp.Date] + Number(resp.Amount);
          } else {
            accumulator[resp.Date] = Number(resp.Amount)
          }
          return accumulator;
        }, {}
      );
      console.log('chart dates' + this.chartDates);
      console.log(this.foodAmounts);

      // const filteredExp = this.expenses.filter((expense) => this.chartDates.includes(expense.Date));

      this.userData = {
        labels: this.formattedDates,
        datasets: [

          {
            label: 'Housing',
            data: this.chartDates.map((date: number) => { return this.housingExpenses[date] || 0 }),
            borderColor: '#3cba9f',
            fill: false,
            tension: .4,
          },
          {
            label: 'Bills',
            data: this.chartDates.map((date: number) => { return this.billsAmounts[date] || 0 }),
            borderColor: '#3cba9f',
            fill: false,
            tension: .4,
          },
          {
            label: 'Savings',
            data: this.chartDates.map((date: number) => { return this.savingsAmounts[date] || 0 }),
            borderColor: '#3cba9f',
            fill: false,
            tension: .4,
          },
          {
            label: 'Entertainment',
            data: this.chartDates.map((date: number) => { return this.entertainmentAmounts[date] || 0 }),
            borderColor: '#3cba9f',
            fill: false,
            tension: .4,
          },
          {
            label: 'Personal Spending',
            data: this.chartDates.map((date: number) => { return this.personalAmounts[date] || 0 }),
            borderColor: '#3cba9f',
            fill: false,
            tension: .4,
          },
          {
            label: 'Food',
            data: this.chartDates.map((date: number) => { return this.foodAmounts[date] || 0 }),
            borderColor: '#3cba9f',
            fill: false,
            tension: .4,
          },
          {
            label: 'Micellaneous',
            data: this.chartDates.map((date: number) => { return this.micelAmounts[date] || 0 }),
            borderColor: '#3cba9f',
            fill: false,
            tension: .4,
          },
          {
            label: 'Medical',
            data: this.chartDates.map((date: number) => { return this.medicalAmounts[date] || 0 }),
            borderColor: '#3cba9f',
            fill: false,
            tension: .4,
          },
          {
            label: 'Transportation',
            data: this.chartDates.map((date: number) => { return this.transportAmounts[date] || 0 }),
            borderColor: '#3cba9f',
            fill: false,
            tension: .4,
          },

        ],
      }
      this.basicOptions = {
        stacked: false,
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#495057',
              suggestedMax: 100,
            },
            grid: {
              drawOnChartArea: true,
              color: '#ebedef'
            }
          },
          x: {
            grid: {
              drawOnChartArea: true,
            }
          }
        }

      }

    });
  }

  getUser(userId: string, token: string): void {
    this.fetchApiData.getUser(userId, token).subscribe((resp: any) => {
      this.userData = resp;
      this.user = resp;
      console.log('user: ' + this.user.CurrencyPref);
      console.log('name' + this.user.FirstName + this.user.LastName);
    });
  }

  openEditExpenseDialog(expense: any): void {
    this.dialog.open(ExpenseEditComponent, {
      data: {
        Date: expense.Date,
      },
      width: '500px'
    });
    console.log(expense.Date);
  }

  openCreateExpenseDialog(): void {
    const dialogRef = this.dialog.open(ExpenseCreateComponent, {
      data: {
        user: this.user,
        date: this.todayDate,
      },
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getExpenses(this.userId, this.token);
    });
  }
}


