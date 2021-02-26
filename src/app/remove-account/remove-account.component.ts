import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remove-account',
  templateUrl: './remove-account.component.html',
  styleUrls: ['./remove-account.component.scss'],
})
export class RemoveAccountComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // When user confirms account deletion
  removeUserAccount(): void {
    this.fetchApiData.removeAccount().subscribe(
      (resp: any) => {
        this.snackBar.open(
          'Your account has successfully been deleted!',
          'OK',
          {
            duration: 2000,
          }
        );
        // Logs user out
        localStorage.clear();
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });

        // Refreshes and redirects to welcome view
        this.router.navigate(['/welcome']).then(() => {
          window.location.reload();
        });
      }
    );
  }

  // When user does not confirm account deletion
  cancel(): void {
    this.router.navigate(['/profile']).then(() => {
      window.location.reload();
    });
  }
}
