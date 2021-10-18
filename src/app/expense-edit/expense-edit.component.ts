import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Expense } from '../types';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.scss']
})
export class ExpenseEditComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Expense
  ) { }



  ngOnInit(): void {
  }

}
