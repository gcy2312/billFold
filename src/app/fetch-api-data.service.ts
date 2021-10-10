import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, Bills, Expenses } from './types';

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
  public userRegistration(userDetails: Partial<User>): Observable<any> {
    console.log(userDetails);
    return this.http.post<User>(`${apiUrl}/users`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  //user login POST
  userLogin(userCred: { username: string, password: string }): Observable<any> {
    console.log(userCred);
    return this.http.post(`${apiUrl}/login`, userCred)
      .pipe(catchError(this.handleError));
  }

  //get user info
  getUser(userId: string, token: string): Observable<any> {
    return this.http.get(`${apiUrl}/users/${userId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //user's list of expenses GET
  getExpenses(userId: string, token: string): Observable<any> {
    return this.http.get(`${apiUrl}/users/${userId}/expenses`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //user's list of bills GET
  getBills(userId: string, token: string): Observable<any> {
    return this.http.get(`${apiUrl}/users/${userId}/bills`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get info single expense
  getExpenseById(expenseId: string, token: string): Observable<any> {
    return this.http.get(`${apiUrl}/expenses/${expenseId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get info single bill
  getBillById(billId: string, token: string): Observable<any> {
    return this.http.get(`${apiUrl}/bills/${billId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //create expense doc POST
  createExpense(expenseInfo: Partial<Expenses>, token: string, userId: string): Observable<any> {
    console.log(expenseInfo);
    return this.http.post(`${apiUrl}/users/${userId}/expenses`, expenseInfo, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  //create bill doc POST
  createBill(billInfo: Partial<Bills>, userId: string, token: string): Observable<any> {
    console.log(billInfo);
    return this.http.post(`${apiUrl}/users/${userId}/bills`, billInfo, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  //edit user details PUT
  editUser(userData: Partial<User>, token: string, userId: string): Observable<any> {
    return this.http.put(`${apiUrl}/users/${userId}`, userData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //edit expense doc PUT
  editExpense(expenseInfo: Partial<Expenses>, expenseId: string, token: string, userId: string): Observable<any> {
    return this.http.put(`${apiUrl}/users/${userId}/expenses/${expenseId}`, expenseInfo, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //edit bill doc PUT
  editBill(billInfo: Partial<Bills>, billId: string, token: string, userId: string): Observable<any> {
    return this.http.put(`${apiUrl}/users/${userId}/bills/${billId}`, billInfo, {
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
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  //delete expense doc
  deleteExpense(expenseId: string, token: string): Observable<any> {
    return this.http.delete(`${apiUrl}/expenses/${expenseId}`, {
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

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}
