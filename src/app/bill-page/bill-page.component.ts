import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';

import { Bill } from '../types';

import { BillDetailsComponent } from '../bill-details/bill-details.component';
import { BillDeleteComponent } from '../bill-delete/bill-delete.component';
import { BillCreateComponent } from '../bill-create/bill-create.component';
import { BillEditComponent } from '../bill-edit/bill-edit.component';


@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})

export class BillPageComponent implements OnInit {

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  reason = '';

  close() {
    this.sidenav.close();
  }

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';
  user = JSON.parse(localStorage.getItem('user') || '');

  bills: Bill[] = [];
  calendarBills: any = [];
  bill = {
    _id: '',
    Description: '',
    Date: '',
    Amount: '',
    Currency: '',
    UserId: '',
    Paid: false,
    Index: false
  };

  calendarOptions: CalendarOptions | undefined;
  deepChangeDetection = true;

  /**
   * constructor for billPage
   * @param fetchApiData 
   * @param snackBar 
   * @param dialog 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getBills(this.userId, this.token);
  }


  /**
   * call API to fetch bills that match userId
   * @param userId 
   * @param token 
   */
  getBills(userId: string, token: string): void {
    this.fetchApiData.getBills(userId, token).subscribe((resp: any) => {
      this.bills = resp;

      this.calendarBills = resp.map((e: any) => ({ title: e.Description, start: e.Date, extendedProps: { Amount: e.Amount, Paid: e.Paid, Currency: e.Currency, userId: userId, _id: e._id } }));

      this.calendarOptions = {
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',

        },
        height: 600,

        initialView: 'dayGridMonth',
        events: this.calendarBills,
        eventTextColor: '#37474F',

        weekends: true,
        editable: false,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        themeSystem: 'bootstrap',

        /**
         * function to change className of event(bill) for styling
         * @param arg 
         * @returns 
         */
        eventClassNames: function (arg) {
          if (arg.event.extendedProps.Paid) {
            return ['PaidYes']
          } else {
            return ['PaidNo']
          }
        },

        /**
         * function to open create bill dialog on dateClick
         * @param bill 
         */
        dateClick: (bill) => {
          this.openBillCreateDialog.bind(this)(bill);
        },
        /**
         * function to open bill details dialog on eventClick
         * @param bill 
         */
        eventClick: (bill) => {
          this.openBillViewDialog.bind(this)(bill);
        },
      };
    })
  }


  /**
   * function to open billDetails dialog with data passed 
   * data according to fullCalendar event formatting
   * @param bill 
   */
  openBillViewDialog(bill: any) {
    const dialogRef = this.dialog.open(BillDetailsComponent, {
      data: {
        title: bill.event.title,
        Amount: bill.event.extendedProps.Amount,
        date: bill.event.start,
        Paid: bill.event.extendedProps.Paid,
        Currency: bill.event.extendedProps.Currency,
        UserId: bill.event.extendedProps.userId,
        _id: bill.event.extendedProps._id,
      },
      width: '270px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getBills(this.userId, this.token);
    });
  }

  /**
   * function to open billDelete dialog with data passed
   * data -- bill
   * @param bill 
   */
  openBillDeleteDialog(bill: any) {
    const dialogRef = this.dialog.open(BillDeleteComponent, {
      data: {
        bill: bill
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getBills(this.userId, this.token);
    })
  }

  /**
   * function to open billEdit dialog with data passed
   * data --bill
   * @param bill 
   */
  openBillEditDialog(bill: any) {
    const dialogRef = this.dialog.open(BillEditComponent, {
      data: {
        bill: bill
      },
      width: '590px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getBills(this.userId, this.token);
    })
  }

  /**
   * function to open billCreate dialog 
   * data (user & bill.dateStr from fullCalendar) 
   * @param bill 
   */
  openBillCreateDialog(bill: any) {
    const dialogRef = this.dialog.open(BillCreateComponent, {
      data: {
        date: bill.dateStr,
        user: this.user,
      },
      width: '575px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getBills(this.userId, this.token);
    });
  }


}



