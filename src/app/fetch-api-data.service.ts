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

  /**
   * Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making it available via this.http
   * @param http 
   */
  constructor(private http: HttpClient) {
  }

  /**
   * register user POST
   * @param userDetails 
   * @returns 
   */
  public userRegistration(userDetails: Partial<User>): Observable<User> {
    console.log(userDetails);
    return this.http.post<User>(`${apiUrl}/users`, userDetails).pipe(
      catchError(this.handleError)
    );
  }


  /**
   * login user POST
   * @param userCred 
   * @returns 
   */
  userLogin(userCred: { Username: string, Password: string }): Observable<{ user: User, token: string }> {
    console.log(userCred);
    return this.http.post<{ user: User, token: string }>(`${apiUrl}/login`, userCred)
      .pipe(catchError(this.handleError));
  }


  /**
   * get user GET
   * @param userId 
   * @param token 
   * @returns 
   */
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


  /**
   * get list of expenses GET
   * map amount to string from $numberDecimal
   * map date to formate yyyy-mm--dd
   * sort latest to earliest
   * only last 100 entries
   * @param userId 
   * @param token 
   * @returns 
   */
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
          ).sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()).slice(0, 100);
        }
      ),
      catchError(this.handleError)
    );
  }


  /**
   * get list of bills GET
   * map amount to string from $numberDecimal
   * map date to format yyyy-mm-dd
   * sort latest to earliest
   * last 100 entries
   * @param userId 
   * @param token 
   * @returns 
   */
  getBills(userId: string, token: string): Observable<Bill[]> {
    return this.http.get<BillAPI[]>(`${apiUrl}/users/${userId}/bills`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(
        (bills: BillAPI[]): Bill[] => {

          return bills.map(
            (e: BillAPI) => ({ ...e, Amount: e.Amount.$numberDecimal, Date: e.Date.substr(0, 10) })
          ).sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()).slice(0, 100)
        }),
      catchError(this.handleError)
    );
  }


  /**
   * get single expense info GET
   * @param expenseId 
   * @param token 
   * @returns 
   */
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


  /**
   * get single bill info GET
   * @param billId 
   * @param token 
   * @returns 
   */
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


  /**
   * create expense document POST
   * @param expenseInfo 
   * @param token 
   * @param userId 
   * @returns 
   */
  createExpense(expenseInfo: Partial<ExpenseAPI>, token: string, userId: string): Observable<ExpenseAPI> {
    console.log(expenseInfo);

    return this.http.post<ExpenseAPI>(`${apiUrl}/users/${userId}/expenses`, expenseInfo, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }


  /**
   * create single bill document POST
   * @param billInfo 
   * @param token 
   * @param userId 
   * @returns 
   */
  createBill(billInfo: Partial<BillAPI>, token: string, userId: string): Observable<BillAPI> {
    console.log(billInfo);
    return this.http.post<BillAPI>(`${apiUrl}/users/${userId}/bills`, billInfo, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }


  /**
   * edit user data PUT
   * @param userData 
   * @param token 
   * @param userId 
   * @returns 
   */
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


  /**
   * edit expense document by id PUT
   * @param expenseInfo 
   * @param expenseId 
   * @param token 
   * @param userId 
   * @returns 
   */
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


  /**
   * edit bill doc by id PUT
   * @param billInfo 
   * @param billId 
   * @param token 
   * @param userId 
   * @returns 
   */
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



  /**
   * delete user by id DELETE
   * @param token 
   * @param userId 
   * @returns 
   */
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


  /**
   * delete expense doc by id DELETE
   * @param expenseId 
   * @param token 
   * @returns 
   */
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


  /**
   * delete bill doc by id
   * @param billId 
   * @param token 
   * @returns 
   */
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


  /**
   * non-tyes response extracttion (set type OR object)
   * @param res 
   * @returns 
   */
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /**
   * function handleError extract error message
   * @param error 
   * @returns 
   */
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

  /**
   * function handleDelete error extract message
   * delete API calls return responseType text
   * @param error 
   * @returns 
   */
  private handleDeleteError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.warn(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error.message}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}