import { Component, OnInit, Inject, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';

const transferBillData = {
  title: '',
  Amount: '',
  date: '',
  Paid: false,
  Currency: '',
  UserId: '',
  _id: '',
}
const PartialBill = {
  Paid: false,
}

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss']
})

export class BillDetailsComponent implements OnInit {
  @Input()
  billDetails = transferBillData;
  billInfo = PartialBill;
  billDate: any = '';

  isChkChecked = false;

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';

  /**
   * constructor for billDetails (data from billPage)
   * @param dialogRef 
   * @param fetchApiData 
   * @param snackBar 
   * @param data 
   */
  constructor(
    public dialogRef: MatDialogRef<BillDetailsComponent>,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  ngOnInit(): void {
    this.billDetails = this.data;

    this.billInfo.Paid = this.data.Paid;
    this.isChkChecked = this.billInfo.Paid;

    let text = (this.billDetails.date).toString();
    this.billDate = text.slice(0, 16);
  }

  /**
   * function to close details dialog when outside click
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * function to switch state of bill to paid/unpaid
   * @param ob 
   */
  onChkChange(ob: MatCheckboxChange) {
    if (ob.checked) {
      this.billInfo.Paid = true;
    } else {
      this.billInfo.Paid = false;
    }
  }



  billId = this.data._id;

  /**
   * call API to edit bill entry only paid/unpaid state
   * @param userId 
   * @param token 
   */
  editBill(userId: string, token: string): void {
    this.fetchApiData.editBill(this.billInfo, this.billId, token, userId).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('Bill document successfully modified', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
