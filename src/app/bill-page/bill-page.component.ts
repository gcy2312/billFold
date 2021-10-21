import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent, CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@fullcalendar/angular';

import { Bill } from '../types';

let str = formatDate(new Date(), {
  month: 'long',
  year: 'numeric',
  day: 'numeric'
});

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})

export class BillPageComponent implements OnInit {

  userId = localStorage.getItem('userId') || '';
  token = localStorage.getItem('token') || '';

  bills: Bill[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getBills(this.userId, this.token);
  }


  calendarOptions: CalendarOptions = {

    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events:
      [
        { title: 'event 1', date: '2021-10-27' },
        { title: 'event 2', date: '2021-10-30' }
      ]
  };
  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr)
  }

  getBills(userId: string, token: string): void {
    this.fetchApiData.getBills(userId, token).subscribe((resp: any) => {
      this.bills = resp;
      console.log(this.bills);
    })
  }
}


