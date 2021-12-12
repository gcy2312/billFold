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

  expensesDates: any = [];
  expensesAmounts: any = [];
  formattedDates: any = [];
  currentMonth: string = '';
  userData: any = {};
  basicOptions: any;

  groceryAmounts: any = [];
  activitiesAmounts: any = [];
  billsAmounts: any = [];
  businessAmounts: any = [];
  entertainmentAmounts: any = [];
  giftAmounts: any = [];
  homeAmounts: any = [];
  medicalAmounts: any = [];
  restaurantAmounts: any = [];
  travelAmounts: any = [];

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

      const actExp = resp.filter((x: { Category: string; }) => x.Category === 'Activities');
      const billExp = resp.filter((x: { Category: string; }) => x.Category === 'Bills');
      const busExp = resp.filter((x: { Category: string; }) => x.Category === 'Business');
      const entExp = resp.filter((x: { Category: string; }) => x.Category === 'Entertainment');
      const gifExp = resp.filter((x: { Category: string; }) => x.Category === 'Gifts');
      const grocExp = resp.filter((x: { Category: string; }) => x.Category === 'Groceries');
      const homExp = resp.filter((x: { Category: string; }) => x.Category === 'Home');
      const medExp = resp.filter((x: { Category: string; }) => x.Category === 'Medical');
      const restExp = resp.filter((x: { Category: string; }) => x.Category === 'Restaurant');
      const traExp = resp.filter((x: { Category: string; }) => x.Category === 'Travel');

      this.groceryAmounts = grocExp.reduce(
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
      this.activitiesAmounts = actExp.reduce(
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
      this.businessAmounts = busExp.reduce(
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
      this.giftAmounts = gifExp.reduce(
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
      this.homeAmounts = homExp.reduce(
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
      this.restaurantAmounts = restExp.reduce(
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
      this.travelAmounts = traExp.reduce(
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
      console.log(this.groceryAmounts);

      this.userData = {
        labels: this.formattedDates,
        datasets: [

          {
            label: 'Activities',
            data: this.chartDates.map((date: number) => { return this.activitiesAmounts[date] || 0 }),
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
            label: 'Business',
            data: this.chartDates.map((date: number) => { return this.businessAmounts[date] || 0 }),
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
            label: 'Gifts',
            data: this.chartDates.map((date: number) => { return this.giftAmounts[date] || 0 }),
            borderColor: '#3cba9f',
            fill: false,
            tension: .4,
          },
          {
            label: 'Groceries',
            data: this.chartDates.map((date: number) => { return this.groceryAmounts[date] || 0 }),
            borderColor: '#3cba9f',
            fill: false,
            tension: .4,
          },
          {
            label: 'Home',
            data: this.chartDates.map((date: number) => { return this.homeAmounts[date] || 0 }),
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
            label: 'Restaurant',
            data: this.chartDates.map((date: number) => { return this.restaurantAmounts[date] || 0 }),
            borderColor: '#3cba9f',
            fill: false,
            tension: .4,
          },
          {
            label: 'Travel',
            data: this.chartDates.map((date: number) => { return this.travelAmounts[date] || 0 }),
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
      data: this.user,
      width: '500px'
    });
  }
}


