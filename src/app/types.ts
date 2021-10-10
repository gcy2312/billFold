export interface User {
  FirstName: string,
  LastName: string,
  Username: string,
  Password: string,
  CurrencyPref: string,
  Email: string
}

export interface Expenses {
  Category: string,
  Description: string,
  Date: Date,
  Amount: string,  //Number || Decimal128?
  Currency: string,
  UserId: string,
  Index: boolean
}

export interface Bills {
  Description: string,
  Date: Date,
  Amount: string, //Number || Decimal128
  Currency: string,
  UserId: string,
  Paid: boolean,
  Index: boolean
}