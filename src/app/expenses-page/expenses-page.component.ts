import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { DatePipe } from '@angular/common';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ExpenseEditComponent } from '../expense-edit/expense-edit.component';
import { ExpenseCreateComponent } from '../expense-create/expense-create.component';
import { ExpenseDeleteComponent } from '../expense-delete/expense-delete.component';

import { Expense } from '../types';
import * as moment from 'moment';


@Component({
  selector: 'app-expenses-page',
  templateUrl: './expenses-page.component.html',
  styleUrls: ['./expenses-page.component.scss']
})

export class ExpensesPageComponent implements OnInit {

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  close() {
    this.sidenav.close();
  }


  expenses: Expense[] = [];
  expense = {
    _id: '',
    Category: '',
    Description: '',
    Date: '',
    Amount: '',
    Currency: '',
    UserId: '',
    Index: false
  };

  todayDate: string = '';

  cmExpenses: any = [];

  formattedDates: any = [];
  prevFormattedDates: any = [];
  twoPrevFormattedDates: any = [];

  chartDates: any = [];
  prevChartDates: any = [];
  twoPrevChartDates: any = [];

  currentMonth: string = '';
  previousMonth: string = '';
  twoPreviousMonth: string = '';

  userData: any = {};
  prevUserData: any = {};
  twoPrevUserData: any = {};
  basicOptions: any;

  foodAmounts: any = [];
  housingExpenses: any = [];
  billsAmounts: any = [];
  savingsAmounts: any = [];
  entertainmentAmounts: any = [];
  personalAmounts: any = [];
  miscelAmounts: any = [];
  medicalAmounts: any = [];
  restaurantAmounts: any = [];
  transportAmounts: any = [];

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';
  user = JSON.parse(localStorage.getItem('user') || '');


  /**
   * constructor for expensePage
   * @param fetchApiData 
   * @param snackBar 
   * @param dialog 
   * @param datepipe 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {

    this.getExpenses(this.userId, this.token);
    this.getDaysArrayByCurrentMonth();
    this.getDaysArrayByPreviousMonth();
    this.getDaysArrayByTwoPreviousMonth();
    this.todayDate = moment().format('YYYY-MM-DD');
  }

  /**
   * function to get array of dates for 2 months previous
   * returns array of chart dates to map expenses
   * set state formatted dates for chart display
   * @returns 
   */
  getDaysArrayByTwoPreviousMonth() {
    var now = moment();
    this.twoPreviousMonth = moment(now).subtract(2, "month").startOf("month").format('MMMM');
    var daysInMonth = moment().daysInMonth();
    var twoPrevArrDays = [];

    while (daysInMonth) {
      var twoPrevious = moment().subtract(2, "month").date(daysInMonth).format('YYYY-MM-DD');
      twoPrevArrDays.push(twoPrevious);
      daysInMonth--;
    }
    this.twoPrevChartDates = twoPrevArrDays.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    this.twoPrevFormattedDates = this.twoPrevChartDates.map((x: any) => {
      const y = moment(x).format('ll').slice(0, 6).replace(',', '');
      return y
    });
    return this.twoPrevChartDates
  }

  /**
   * function to get array of dates for previous month
   * returns array of dates to map expenses
   * set state formatted dates for chart display
   * @returns 
   */
  getDaysArrayByPreviousMonth() {
    var now = moment();
    this.previousMonth = moment(now).subtract(1, "month").startOf("month").format('MMMM');
    var daysInMonth = moment().daysInMonth();
    var prevArrDays = [];

    while (daysInMonth) {
      var previous = moment().subtract(1, "month").date(daysInMonth).format('YYYY-MM-DD');
      prevArrDays.push(previous);
      daysInMonth--;
    }
    this.prevChartDates = prevArrDays.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    this.prevFormattedDates = this.prevChartDates.map((x: any) => {
      const y = moment(x).format('ll').slice(0, 6).replace(',', '');
      return y
    });
    return this.prevChartDates
  }

  /**
   * function to get array of dates for current month
   * returns array of dates to map expenses
   * set state of formatted dates for chart display
   * @returns 
   */
  getDaysArrayByCurrentMonth() {
    var now = moment();
    this.currentMonth = now.format('MMMM');
    var daysInMonth = moment().daysInMonth();
    var arrDays = [];

    while (daysInMonth) {
      var current = moment().date(daysInMonth).format('YYYY-MM-DD');
      arrDays.push(current);
      daysInMonth--;
    }
    this.chartDates = arrDays.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    this.formattedDates = this.chartDates.map((x: any) => {
      const y = moment(x).format('ll').slice(0, 6).replace(',', '');
      return y
    });
    return this.chartDates
  }

  /**
   * call API to get array of all expenses
   * filter expenses by category
   * accumulator(reduce) to map if same date and add amounts
   * set chart data and options
   * @param userId 
   * @param token 
   */
  getExpenses(userId: string, token: string): void {
    this.fetchApiData.getExpenses(userId, token).subscribe((resp: any) => {
      this.expenses = resp;

      this.cmExpenses = this.expenses.filter((expense) => this.chartDates.includes(expense.Date));

      const housExp = resp.filter((x: { Category: string; }) => x.Category === 'Housing');
      const transExp = resp.filter((x: { Category: string; }) => x.Category === 'Transportation');
      const billExp = resp.filter((x: { Category: string; }) => x.Category === 'Bills');
      const foodExp = resp.filter((x: { Category: string; }) => x.Category === 'Food');
      const medExp = resp.filter((x: { Category: string; }) => x.Category === 'Medical');
      const savExp = resp.filter((x: { Category: string; }) => x.Category === 'Savings');
      const entExp = resp.filter((x: { Category: string; }) => x.Category === 'Entertainment');
      const persExp = resp.filter((x: { Category: string; }) => x.Category === 'Personal');
      const micExp = resp.filter((x: { Category: string; }) => x.Category === 'Miscellaneous');

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
      this.miscelAmounts = micExp.reduce(
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


      this.userData = {
        labels: this.formattedDates,
        datasets: [

          {
            label: 'Housing',
            data: this.chartDates.map((date: number) => { return this.housingExpenses[date] || 0 }),
            borderColor: '#26c6da',
            fill: false,
            tension: .4,
          },
          {
            label: 'Bills',
            data: this.chartDates.map((date: number) => { return this.billsAmounts[date] || 0 }),
            borderColor: '#00838f',
            fill: false,
            tension: .4,
          },
          {
            label: 'Savings',
            data: this.chartDates.map((date: number) => { return this.savingsAmounts[date] || 0 }),
            borderColor: '#66bb6a',
            fill: false,
            tension: .4,
          },
          {
            label: 'Entertainment',
            data: this.chartDates.map((date: number) => { return this.entertainmentAmounts[date] || 0 }),
            borderColor: '#2e7d32',
            fill: false,
            tension: .4,
          },
          {
            label: 'Personal Spending',
            data: this.chartDates.map((date: number) => { return this.personalAmounts[date] || 0 }),
            borderColor: '#ffca28',
            fill: false,
            tension: .4,
          },
          {
            label: 'Food',
            data: this.chartDates.map((date: number) => { return this.foodAmounts[date] || 0 }),
            borderColor: '#ff8f00',
            fill: false,
            tension: .4,
          },
          {
            label: 'Miscellaneous ',
            data: this.chartDates.map((date: number) => { return this.miscelAmounts[date] || 0 }),
            borderColor: '#f44336',
            fill: false,
            tension: .4,
          },
          {
            label: 'Medical',
            data: this.chartDates.map((date: number) => { return this.medicalAmounts[date] || 0 }),
            borderColor: '#ec407a',
            fill: false,
            tension: .4,
          },
          {
            label: 'Transportation',
            data: this.chartDates.map((date: number) => { return this.transportAmounts[date] || 0 }),
            borderColor: '#ad1457',
            fill: false,
            tension: .4,
          },

        ],
      }
      this.prevUserData = {
        labels: this.prevFormattedDates,
        datasets: [

          {
            label: 'Housing',
            data: this.prevChartDates.map((date: number) => { return this.housingExpenses[date] || 0 }),
            borderColor: '#26c6da',
            fill: false,
            tension: .4,
          },
          {
            label: 'Bills',
            data: this.prevChartDates.map((date: number) => { return this.billsAmounts[date] || 0 }),
            borderColor: '#00838f',
            fill: false,
            tension: .4,
          },
          {
            label: 'Savings',
            data: this.prevChartDates.map((date: number) => { return this.savingsAmounts[date] || 0 }),
            borderColor: '#66bb6a',
            fill: false,
            tension: .4,
          },
          {
            label: 'Entertainment',
            data: this.prevChartDates.map((date: number) => { return this.entertainmentAmounts[date] || 0 }),
            borderColor: '#2e7d32',
            fill: false,
            tension: .4,
          },
          {
            label: 'Personal Spending',
            data: this.prevChartDates.map((date: number) => { return this.personalAmounts[date] || 0 }),
            borderColor: '#ffca28',
            fill: false,
            tension: .4,
          },
          {
            label: 'Food',
            data: this.prevChartDates.map((date: number) => { return this.foodAmounts[date] || 0 }),
            borderColor: '#ff8f00',
            fill: false,
            tension: .4,
          },
          {
            label: 'Miscellaneous ',
            data: this.prevChartDates.map((date: number) => { return this.miscelAmounts[date] || 0 }),
            borderColor: '#f44336',
            fill: false,
            tension: .4,
          },
          {
            label: 'Medical',
            data: this.prevChartDates.map((date: number) => { return this.medicalAmounts[date] || 0 }),
            borderColor: '#ec407a',
            fill: false,
            tension: .4,
          },
          {
            label: 'Transportation',
            data: this.prevChartDates.map((date: number) => { return this.transportAmounts[date] || 0 }),
            borderColor: '#ad1457',
            fill: false,
            tension: .4,
          },

        ],
      }
      this.twoPrevUserData = {
        labels: this.twoPrevFormattedDates,
        datasets: [

          {
            label: 'Housing',
            data: this.twoPrevChartDates.map((date: number) => { return this.housingExpenses[date] || 0 }),
            borderColor: '#26c6da',
            fill: false,
            tension: .4,
          },
          {
            label: 'Bills',
            data: this.twoPrevChartDates.map((date: number) => { return this.billsAmounts[date] || 0 }),
            borderColor: '#00838f',
            fill: false,
            tension: .4,
          },
          {
            label: 'Savings',
            data: this.twoPrevChartDates.map((date: number) => { return this.savingsAmounts[date] || 0 }),
            borderColor: '#66bb6a',
            fill: false,
            tension: .4,
          },
          {
            label: 'Entertainment',
            data: this.twoPrevChartDates.map((date: number) => { return this.entertainmentAmounts[date] || 0 }),
            borderColor: '#2e7d32',
            fill: false,
            tension: .4,
          },
          {
            label: 'Personal Spending',
            data: this.twoPrevChartDates.map((date: number) => { return this.personalAmounts[date] || 0 }),
            borderColor: '#ffca28',
            fill: false,
            tension: .4,
          },
          {
            label: 'Food',
            data: this.twoPrevChartDates.map((date: number) => { return this.foodAmounts[date] || 0 }),
            borderColor: '#ff8f00',
            fill: false,
            tension: .4,
          },
          {
            label: 'Miscellaneous ',
            data: this.twoPrevChartDates.map((date: number) => { return this.miscelAmounts[date] || 0 }),
            borderColor: '#f44336',
            fill: false,
            tension: .4,
          },
          {
            label: 'Medical',
            data: this.twoPrevChartDates.map((date: number) => { return this.medicalAmounts[date] || 0 }),
            borderColor: '#ec407a',
            fill: false,
            tension: .4,
          },
          {
            label: 'Transportation',
            data: this.twoPrevChartDates.map((date: number) => { return this.transportAmounts[date] || 0 }),
            borderColor: '#ad1457',
            fill: false,
            tension: .4,
          },

        ],
      }
      this.basicOptions = {
        responsive: true,
        maintainAspectRatio: false,
        stacked: false,
        plugins: {
          legend: {
            labels: {
              color: '#fff'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#fff',
              suggestedMax: 100,
            },
            grid: {
              drawOnChartArea: true,
              color: '#37474F',
              font: 'Raleway'
            }
          },
          x: {
            ticks: {
              color: '#fff'
            },
            grid: {
              drawOnChartArea: true,
              color: '#37474F'
            }
          }
        }

      }
    });
  }

  /**
   * function to open edit expense dialog
   * data: expense, type: expense
   * @param expense 
   */
  openEditExpenseDialog(expense: any): void {
    const dialogRef = this.dialog.open(ExpenseEditComponent, {
      data: {
        expense: expense,
      },
      width: '630px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getExpenses(this.userId, this.token);
    });
  }

  /**
   * function to open create expense dialog
   * data: user and todayDate
   * call getExpenses to refresh after dialog closed
   */
  openCreateExpenseDialog(): void {
    const dialogRef = this.dialog.open(ExpenseCreateComponent, {
      data: {
        user: this.user,
        date: this.todayDate,
      },
      width: '590px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getExpenses(this.userId, this.token);
    });
  }

  /**
   * function to open delete expense dialog
   * data: user, expense
   * call getExpenses after dialog closed to refresh
   * @param expense 
   */
  openDeleteExpenseDialog(expense: any): void {
    const dialogRef = this.dialog.open(ExpenseDeleteComponent, {
      data: {
        user: this.user,
        expense: expense
      },
      width: '510px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getExpenses(this.userId, this.token);
    });
  }
}


