export interface User {
  _id: string,
  FirstName: string,
  LastName: string,
  Username: string,
  Password: string,
  CurrencyPref: string,
  Email: string
}

export interface Expense {
  _id: string,
  Category: string,
  Description: string,
  Date: string,  //need to parse before Date
  Amount: { $numberDecimal: string },  //Decimal128 takes string value
  Currency: string,
  UserId: string,
  Index: boolean
}

export interface ExpenseAPI {
  _id: string,
  Category: string,
  Description: string,
  Date: string,  //need to parse before Date
  Amount: any,  //Decimal128 takes string value
  Currency: string,
  UserId: string,
  Index: boolean
}

export interface Bill {
  _id: string
  Description: string,
  Date: string,    //need to parse befire Date
  Amount: { $numberDecimal: string },   //Decimal128 takes string value
  Currency: string,
  UserId: string,
  Paid: boolean,
  Index: boolean
}

export interface BillAPI {
  _id: string,
  Description: string,
  Date: Date,  //need to parse before Date
  Amount: string,  //Decimal128 takes string value
  Currency: string,
  UserId: string,
  Paid: boolean,
  Index: boolean
}