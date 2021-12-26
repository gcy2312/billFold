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
  @Input() billDetails = transferBillData; billInfo = PartialBill;

  isChkChecked = false;

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';

  constructor(
    public dialogRef: MatDialogRef<BillDetailsComponent>,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  ngOnInit(): void {
    this.billDetails = this.data;
    console.log(this.billDetails.Amount);

    this.billInfo.Paid = this.data.Paid;
    this.isChkChecked = this.billInfo.Paid;

    console.log('title: ' + this.billDetails.title);
    console.log('billId: ' + this.billDetails._id);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onChkChange(ob: MatCheckboxChange) {
    if (ob.checked) {
      this.billInfo.Paid = true;
    } else {
      this.billInfo.Paid = false;
    }
  }

  billId = this.data._id;

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
