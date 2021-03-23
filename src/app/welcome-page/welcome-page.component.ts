import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  /**
   *
   * @param dialog
   */
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  /**
   * Directs user to account registration component to handle account creation
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {});
  }

  /**
   * Directs user to user login component to handle login
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {});
  }
}
