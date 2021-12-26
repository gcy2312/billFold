import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg, EventChangeArg, DateSelectArg } from '@fullcalendar/angular'; // useful for typechecking
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { BillDetailsComponent } from '../bill-details/bill-details.component';

import { Bill } from '../types';
import { BillDeleteComponent } from '../bill-delete/bill-delete.component';
import { BillCreateComponent } from '../bill-create/bill-create.component';
import { DateClickArg } from '@fullcalendar/interaction';
import { BillEditComponent } from '../bill-edit/bill-edit.component';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})

export class BillPageComponent implements OnInit {

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

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    // public billDialogRef: MatDialogRef<BillDetailsComponent>,
  ) { }

  ngOnInit(): void {
    this.getBills(this.userId, this.token);
  }


  getBills(userId: string, token: string): void {
    this.fetchApiData.getBills(userId, token).subscribe((resp: any) => {
      this.bills = resp;
      this.calendarBills = resp.map((e: any) => ({ title: e.Description, start: e.Date, extendedProps: { Amount: e.Amount, Paid: e.Paid, Currency: e.Currency, userId: userId, _id: e._id } }));
      console.log(this.bills);
      console.log(this.calendarBills);

      this.calendarOptions = {
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        initialView: 'dayGridMonth',
        events: this.calendarBills, // alternatively, use the `events` setting to fetch from a feed
        weekends: true,
        editable: false,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        // select: this.handleDateSelect.bind(this),
        // eventsSet: this.handleEvents.bind(this),
        ///you can update a remote database when these fire:
        // eventAdd:
        // eventChange: this.handleBillChange.bind(this),
        // eventRemove:

        dateClick: (bill) => {
          // alert('Date: ' + bill.dateStr);
          this.openBillCreateDialog.bind(this)(bill);
        },
        eventClick: (bill) => {
          this.openBillViewDialog.bind(this)(bill);
        },
      };
    })
  }

  openBillViewDialog(bill: any) {
    const dialogRef = this.dialog.open(BillDetailsComponent, {
      data: {
        title: bill.event.title,
        Amount: bill.event.extendedProps.Amount,
        date: bill.event.date,
        Paid: bill.event.extendedProps.Paid,
        Currency: bill.event.extendedProps.Currency,
        UserId: bill.event.extendedProps.userId,
        _id: bill.event.extendedProps._id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getBills(this.userId, this.token);
    });
  }

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

  openBillEditDialog(bill: any) {
    const dialogRef = this.dialog.open(BillEditComponent, {
      data: {
        bill: bill
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getBills(this.userId, this.token);
    })
  }

  openBillCreateDialog(bill: any) {
    const dialogRef = this.dialog.open(BillCreateComponent, {
      data: {
        date: bill.dateStr,
        user: this.user,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getBills(this.userId, this.token);
    });
  }


}



