import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

const PartialBill = {
  _id: '',
  Description: '',
  Amount: '',
  Date: '',
  Currency: '',
  Paid: false,
  Index: true
}

@Component({
  selector: 'app-bill-edit',
  templateUrl: './bill-edit.component.html',
  styleUrls: ['./bill-edit.component.scss']
})


export class BillEditComponent implements OnInit {
  @Input() billInfo = PartialBill;

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';
  user = JSON.parse(localStorage.getItem('user') || '');
  billId: string = '';

  /**
   * constructor for editBills
   * @param data 
   * @param fetchApiData 
   * @param dialogRef 
   * @param snackBar 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<BillEditComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.billInfo = this.data.bill;
    this.billInfo.Currency = this.user.CurrencyPref;
    this.billId = this.data.bill._id;
  }

  /**
   * call API to edit all bill detials
   * @param userId 
   * @param token 
   * @param billId 
   */
  editBill(userId: string, token: string, billId: string): void {
    this.fetchApiData.editBill(this.billInfo, billId, token, userId).subscribe((result) => {
      this.dialogRef.close();
      this.snackBar.open('Bill document was successfully modified', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
