import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';


const PartialBill = {
  Description: '',
  Date: '',
  Amount: 0.0,
  Paid: false,
  Currency: '',
};

@Component({
  selector: 'app-bill-create',
  templateUrl: './bill-create.component.html',
  styleUrls: ['./bill-create.component.scss']
})

export class BillCreateComponent implements OnInit {

  @Input() billInfo = PartialBill;

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';


  isChkChecked = false;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<BillCreateComponent>,
    public snackBar: MatSnackBar,

    @Inject(MAT_DIALOG_DATA) public data: any,


  ) { }


  ngOnInit(): void {
    this.getUser(this.token, this.userId);
    this.billInfo.Date = this.data.date;

    console.log(this.billInfo.Date);
  }



  createBill(userId: string, token: string): void {
    this.fetchApiData.createBill(this.billInfo, userId, token).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('Bill document successfully added', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  onChkChange(ob: MatCheckboxChange) {
    if (ob.checked) {
      this.billInfo.Paid = true;
    } else {
      this.billInfo.Paid = false;
    }
  }

  getUser(token: string, userId: string): void {
    console.log('User Id: ' + this.userId);
    console.log('User token: ' + this.token);
  }

}
