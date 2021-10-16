import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { ExpenseDetailsComponent } from '../expense-details/expense-details.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseEditComponent } from '../expense-edit/expense-edit.component';
import { ExpenseCreateComponent } from '../expense-create/expense-create.component';


@Component({
  selector: 'app-expenses-page',
  templateUrl: './expenses-page.component.html',
  styleUrls: ['./expenses-page.component.scss']
})
export class ExpensesPageComponent implements OnInit {
  expenses: any[] = [];
  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getExpenses(this.userId, this.token);
  }

  getExpenses(userId: string, token: string): void {
    this.fetchApiData.getExpenses(userId, token).subscribe((resp: any) => {
      this.expenses = resp;
      console.log(this.expenses);
      return this.expenses;
    });
  }

  // getExpenseById(expenseId:string, token:string): void {
  //   this.fetchApiData.getExpenseById(expenseId, token).subscribe((resp:any)=>{

  //   })
  // }

  // getExpenseDetails(_id: string, Category: string, Description: string, Date: string, Amount: string, Currency: string): void {
  //   this.dialog.open(ExpenseDetailsComponent, {
  //     data: { Category: Category, Description: Description, Date: Date, Amount: Amount, Currency: Currency },
  //     width: '500px'
  //   });
  // }

  openEditExpenseDialog(_id: string, Category: string, Description: string, Date: string, Amount: string, Currency: string): void {
    this.dialog.open(ExpenseEditComponent, {
      data: { Category: Category, Description: Description, Date: Date, Amount: Amount, Currency: Currency },
      width: '500px'
    });
  }

  openCreateExpenseDialog(): void {
    this.dialog.open(ExpenseCreateComponent, {
      width: '280px'
    });
  }

}
