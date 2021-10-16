import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileUpdateComponent } from './user-profile-update/user-profile-update.component';
import { UserProfileDeleteComponent } from './user-profile-delete/user-profile-delete.component';

import { ExpensesPageComponent } from './expenses-page/expenses-page.component';
import { ExpenseCreateComponent } from './expense-create/expense-create.component';
import { BillCreateComponent } from './bill-create/bill-create.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';

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
    UserLoginFormComponent,
    WelcomePageComponent,
    ExpensesPageComponent,
    UserProfileComponent,
    UserProfileUpdateComponent,
    UserProfileDeleteComponent,
    ExpenseCreateComponent,
    BillCreateComponent,
    BillPageComponent,
    ExpenseDetailsComponent,
    BillDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    MatIconModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      // registrationStrategy: 'registerWhenStable:30000'
      registrationStrategy: 'registerImmediately'
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
