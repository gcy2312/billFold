import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FetchApiDataService } from './fetch-api-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule, SwRegistrationOptions } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  listPlugin,
  timeGridPlugin,

]);

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileDeleteComponent } from './user-profile-delete/user-profile-delete.component';
import { ExpensesPageComponent } from './expenses-page/expenses-page.component';
import { ExpenseCreateComponent } from './expense-create/expense-create.component';
import { BillCreateComponent } from './bill-create/bill-create.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';
import { ExpenseEditComponent } from './expense-edit/expense-edit.component';
import { BillDeleteComponent } from './bill-delete/bill-delete.component';
import { UserUpdateUsernameComponent } from './user-update-username/user-update-username.component';
import { UserUpdateNameComponent } from './user-update-name/user-update-name.component';
import { UserUpdatePasswordComponent } from './user-update-password/user-update-password.component';
import { UserUpdateEmailComponent } from './user-update-email/user-update-email.component';
import { UserUpdateCurrencyComponent } from './user-update-currency/user-update-currency.component';
import { ExpenseDeleteComponent } from './expense-delete/expense-delete.component';
import { BillEditComponent } from './bill-edit/bill-edit.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';


const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'expenses', component: ExpensesPageComponent },
  { path: 'calendar', component: BillPageComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    WelcomePageComponent,
    ExpensesPageComponent,
    UserProfileComponent,
    UserProfileDeleteComponent,
    ExpenseCreateComponent,
    BillCreateComponent,
    BillPageComponent,
    BillDetailsComponent,
    ExpenseEditComponent,
    BillDeleteComponent,
    UserUpdateUsernameComponent,
    UserUpdateNameComponent,
    UserUpdatePasswordComponent,
    UserUpdateEmailComponent,
    UserUpdateCurrencyComponent,
    ExpenseDeleteComponent,
    BillEditComponent,
    NavBarComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    PanelModule,
    FullCalendarModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      // registrationStrategy: 'registerWhenStable:30000'
      registrationStrategy: 'registerImmediately'
    }),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    DatePipe, FetchApiDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
