export interface User {
  id: string,
  FirstName: string,
  LastName: string,
  Username: string,
  Password: string,
  CurrencyPref: string,
  Email: string
}

export interface Expense {
  id: string,
  Category: string,
  Description: string,
  Date: Date,
  Amount: string,  //Number || Decimal128?
  Currency: string,
  UserId: string,
  Index: boolean
}

export interface Bill {
  id: string
  Description: string,
  Date: Date,
  Amount: string, //Number || Decimal128
  Currency: string,
  UserId: string,
  Paid: boolean,
  Index: boolean
}