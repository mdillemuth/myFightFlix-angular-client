import { Component, OnInit, Input } from '@angular/core';

// Backend logic for registering new user
import { UserRegistrationService } from '../fetch-api-data.service';
// Closes dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// Displays notifications
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  isLoading = false;

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.isLoading = true;
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        // Logic for a successful user registration goes here!
        this.isLoading = false;
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      },
      (response) => {
        this.isLoading = false;
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
