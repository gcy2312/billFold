import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';


const PartialBill = {
  Description: '',
  Date: '',
  Amount: '',
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

  /**
   * constructor for create bill (data from billPage)
   * @param fetchApiData 
   * @param dialogRef 
   * @param snackBar 
   * @param data 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<BillCreateComponent>,
    public snackBar: MatSnackBar,

    @Inject(MAT_DIALOG_DATA) public data: any,


  ) { }


  ngOnInit(): void {

    this.billInfo.Date = this.data.date;
    this.isChkChecked = false;
  }


  /**
   * call API function to create a bill (currency taken from this.user)
   * @param userId 
   * @param token 
   */
  createBill(userId: string, token: string): void {
    this.billInfo.Currency = this.data.user.CurrencyPref;
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

  /**
   * checkbox for setting bill to paid/unpaid
   * @param ob 
   */
  onChkChange(ob: MatCheckboxChange) {
    if (ob.checked) {
      this.billInfo.Paid = true;
    } else {
      this.billInfo.Paid = false;
    }
  }

}
