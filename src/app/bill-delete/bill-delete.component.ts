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
  selector: 'app-bill-delete',
  templateUrl: './bill-delete.component.html',
  styleUrls: ['./bill-delete.component.scss']
})
export class BillDeleteComponent implements OnInit {
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
