import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, Bill, Expense, ExpenseAPI, BillAPI } from './types';
import { options } from 'preact';

const apiUrl = 'https://expenses-api-2312.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // register user POST
  public userRegistration(userDetails: Partial<User>): Observable<User> {
    console.log(userDetails);
    return this.http.post<User>(`${apiUrl}/users`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // user login POST
  userLogin(userCred: { Username: string, Password: string }): Observable<{ user: User, token: string }> {
    console.log(userCred);
    return this.http.post<{ user: User, token: string }>(`${apiUrl}/login`, userCred)
      .pipe(catchError(this.handleError));
  }

  // userLogin(userCred: any): Observable<any> {
  //   return this.http.post(`${apiUrl}/login`, userCred).pipe(catchError(this.handleError));
  // }

  //get user info
  getUser(userId: string, token: string): Observable<User> {
    return this.http.get<User>(`${apiUrl}/users/${userId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //user's list of expenses GET
  getExpenses(userId: string, token: string): Observable<Expense[]> {
    return this.http.get<ExpenseAPI[]>(`${apiUrl}/users/${userId}/expenses`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(
        (expenses: ExpenseAPI[]): Expense[] => {
          return expenses.map(
            (e: ExpenseAPI) => ({ ...e, Amount: e.Amount.$numberDecimal, Date: e.Date.substr(0, 10) })
          ).sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
        }
      ),
      catchError(this.handleError)
    );
  }


  //user's list of bills GET
  getBills(userId: string, token: string): Observable<Bill[]> {
    return this.http.get<BillAPI[]>(`${apiUrl}/users/${userId}/bills`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(
        (bills: BillAPI[]): Bill[] =>
          bills.map(
            (e: BillAPI) => ({ ...e, Amount: e.Amount.$numberDecimal, Date: e.Date.substr(0, 10) })
          ).sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())
      ),
      catchError(this.handleError)
    );
  }

  //get info single expense
  getExpenseById(expenseId: string, token: string): Observable<Expense> {
    return this.http.get<Expense>(`${apiUrl}/expenses/${expenseId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get info single bill
  getBillById(billId: string, token: string): Observable<Bill> {
    return this.http.get<Bill>(`${apiUrl}/bills/${billId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //create expense doc POST
  createExpense(expenseInfo: Partial<Expense>, token: string, userId: string): Observable<Expense> {
    console.log(expenseInfo);

    return this.http.post<Expense>(`${apiUrl}/users/${userId}/expenses`, expenseInfo, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  //create bill doc POST
  createBill(billInfo: Partial<Bill>, token: string, userId: string): Observable<Bill> {
    console.log(billInfo);
    return this.http.post<Bill>(`${apiUrl}/users/${userId}/bills`, billInfo, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  //edit user details PUT
  editUser(userData: Partial<User>, token: string, userId: string): Observable<User> {
    return this.http.put<User>(`${apiUrl}/users/${userId}`, userData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //edit expense doc PUT
  editExpense(expenseInfo: Partial<ExpenseAPI>, expenseId: string, token: string, userId: string): Observable<ExpenseAPI> {
    return this.http.put<ExpenseAPI>(`${apiUrl}/users/${userId}/expenses/${expenseId}`, expenseInfo, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //edit bill doc PUT
  editBill(billInfo: Partial<BillAPI>, billId: string, token: string, userId: string): Observable<BillAPI> {
    return this.http.put<BillAPI>(`${apiUrl}/users/${userId}/bills/${billId}`, billInfo, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //delete user


  deleteUser(token: string, userId: string): Observable<any> {
    return this.http.delete(`${apiUrl}/users/${userId}`, {
      ...options,
      responseType: 'text',

      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleDeleteError)
      );
  }

  //delete expense doc
  deleteExpense(expenseId: string, token: string): Observable<any> {
    return this.http.delete(`${apiUrl}/expenses/${expenseId}`, {
      ...options,
      responseType: 'text',
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  //delete bill doc
  deleteBill(billId: string, token: string): Observable<any> {
    return this.http.delete(`${apiUrl}/bills/${billId}`, {
      ...options,
      responseType: 'text',
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  //non-tyes response extracttion (set type OR object)
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.message}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  private handleDeleteError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.warn(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.message}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}