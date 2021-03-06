import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  isLoading = false;

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   *
   * @param fetchApiData
   * @param dialogRef
   * @param snackBar
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Handles registering user account by contacting the API
   */
  registerUser(): void {
    this.isLoading = true;
    this.fetchApiData.createAccount(this.userData).subscribe(
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
