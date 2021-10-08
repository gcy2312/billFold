import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://expenses-api-2312.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // register user POST
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(`${apiUrl}/users`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  //user login POST
  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(`${apiUrl}/login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  //get user info
  getUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/users/${user}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //user's list of expenses GET
  getExpenses(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/users/${user}/expenses`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //user's list of bills GET
  getBills(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/users/${user}/bills`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get info single expense
  getOneExpense(expense: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/expenses/${expense}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get info single bill
  getOneBill(bill: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/bills/${bill}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //create expense doc POST
  createExpense(expenseInfo: any): Observable<any> {
    console.log(expenseInfo);
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.post(`${apiUrl}/users/${user}/expenses`, expenseInfo, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  //create bill doc POST
  createBill(billInfo: any): Observable<any> {
    console.log(billInfo);
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.post(`${apiUrl}/users/${user}/bills`, billInfo, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  //edit user details PUT
  editUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.put(`${apiUrl}/users/${user}`, userData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //edit expense doc PUT
  editExpense(expenseInfo: any, expense: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.put(`${apiUrl}/users/${user}/expenses/${expense}`, expenseInfo, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //edit bill doc PUT
  editBill(billInfo: any, bill: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.put(`${apiUrl}/users/${user}/bills/${bill}`, billInfo, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //delete user
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.delete(`${apiUrl}/users/${user}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  //delete expense doc
  deleteExpense(expense: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}/expenses/${expense}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  //delete bill doc
  deleteBill(bill: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}/bills/${bill}`, {
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
