import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Bill } from '../types';

const PartialBill = {
  Description: '',
  Date: '',
  Amount: { $numberDecimal: '' },
  Currency: '',
};

@Component({
  selector: 'app-bill-edit',
  templateUrl: './bill-edit.component.html',
  styleUrls: ['./bill-edit.component.scss']
})
export class BillEditComponent implements OnInit {
  @Input() billInfo = PartialBill;

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Bill

  ) { }

  ngOnInit(): void {
  }

}
