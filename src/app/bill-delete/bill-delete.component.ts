import { Component, OnInit, Inject, Input } from '@angular/core';

import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';


const PartialBill = {
  Description: '',
  Date: '',
  Amount: { $numberDecimal: '' },
  Currency: '',
  UserId: '',
  Index: true,
  Paid: false,
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
  billId: string = '';

  /**
   * constructor for bill delete (data from billPage)
   * @param fetchApiData 
   * @param snackBar 
   * @param dialog 
   * @param dialogRef 
   * @param router 
   * @param data 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<BillDeleteComponent>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    this.billInfo = this.data.bill;
    this.billId = this.data.bill._id;
  }

  /**
   * call API to delete bill entry
   * @param billId 
   * @param token 
   */
  deleteBill(billId: string, token: string): void {
    this.fetchApiData.deleteBill(billId, token).subscribe((resp: any) => {
      this.dialogRef.close();
      this.snackBar.open(
        'Bill document has been deleted!', 'OK', {
        duration: 2000,
      }
      );
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000,
      });
      this.router.navigate(['/calendar']).then(() => {
        window.location.reload();
      });
    }
    );
  }

  /**
   * function to cancel bill delete and navigate back to calendar
   */
  cancel(): void {
    this.router.navigate(['/calendar']).then(() => {
      window.location.reload();
    });
  }

}
