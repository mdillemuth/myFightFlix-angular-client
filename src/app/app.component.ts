// src/app/app.component.ts
import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'myFightFlix-angular-client';

  constructor(public dialog: MatDialog) {}
  // Opens dialog when 'Sign Up' button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Dialog box width
      width: '280px',
    });
  }

  openUserLoginDialog(): void {
    // Opens dialog when 'Login' button is clicked
    this.dialog.open(UserLoginFormComponent, {
      // Dialog box width
      width: '280px',
    });
  }
}
